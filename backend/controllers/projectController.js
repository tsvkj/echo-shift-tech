const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
const axios = require("axios");

// ==========================================
// TRANSLATION
// ==========================================

const translateToArabic = async (text) => {
  if (!text || typeof text !== "string" || text.trim() === "") return text || "";

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "Translate English to Arabic. Return ONLY the translation. No explanation.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      },
    );

    const translated = response.data.choices?.[0]?.message?.content?.trim();
    // Ensure we never return an empty string — fall back to English
    return translated && translated.length > 0 ? translated : text;
  } catch (err) {
    console.error("Groq translation failed:", err.response?.data || err.message);
    return text; // fallback to English so validation doesn't fail
  }
};

// ==========================================
// CLOUDINARY UPLOAD
// ==========================================

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "portfolio-projects" },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// ==========================================
// GET PROJECTS
// ==========================================

const getProjects = async (req, res) => {
  try {
    const { featured } = req.query;

    const filter = {};
    if (featured === "true") filter.featured = true;

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    console.error("GET PROJECTS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    console.error("GET PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// CREATE PROJECT
// ==========================================

const createProject = async (req, res) => {
  try {
    // ----------------------------------------
    // UPLOAD IMAGES
    // ----------------------------------------
    let images = [];

    // imagesMeta is an array aligned 1-to-1 with req.files
    const meta = JSON.parse(req.body.imagesMeta || "[]");

    if (req.files && req.files.length > 0) {
      for (const [index, file] of req.files.entries()) {
        const uploaded = await uploadToCloudinary(file.buffer);

        images.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
          caption: meta[index]?.caption || "",
          isMain: meta[index]?.isMain ?? index === 0, // first image is main by default
        });
      }
    }

    // ----------------------------------------
    // TRANSLATE FIELDS
    // ----------------------------------------
    const titleEn = (req.body.title || "").trim();
    const shortDescEn = (req.body.shortDescription || "").trim();
    const descEn = (req.body.description || "").trim();

    // Run translations in parallel; each call falls back to English on failure
    const [titleAr, shortDescAr, descAr] = await Promise.all([
      translateToArabic(titleEn),
      translateToArabic(shortDescEn),
      translateToArabic(descEn),
    ]);

    // ----------------------------------------
    // FEATURES — stored as plain strings in DB
    // The schema must be [String], not [translationSchema]
    // ----------------------------------------
    const features = JSON.parse(req.body.features || "[]");

    // ----------------------------------------
    // CREATE
    // ----------------------------------------
    const project = await Project.create({
      title: { en: titleEn, ar: titleAr },
      shortDescription: { en: shortDescEn, ar: shortDescAr },
      description: { en: descEn, ar: descAr },
      technologies: JSON.parse(req.body.technologies || "[]"),
      projectUrl: req.body.projectUrl || "",
      category: req.body.category || "Web",
      featured: req.body.featured === "true",
      features,
      images,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// UPDATE PROJECT
// ==========================================

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ----------------------------------------
    // DELETE REMOVED IMAGES FROM CLOUDINARY
    // ----------------------------------------
    const deletedImages = JSON.parse(req.body.deletedImages || "[]");

    for (const publicId of deletedImages) {
      if (!publicId) continue;

      try {
        const result = await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        console.log("Cloudinary delete result:", result);
      } catch (err) {
        console.error("Failed deleting image from Cloudinary:", publicId, err);
        // Non-fatal — continue with update
      }
    }

    // ----------------------------------------
    // MERGE EXISTING + NEW IMAGES
    // ----------------------------------------
    let images = JSON.parse(req.body.existingImages || "[]");

    const meta = JSON.parse(req.body.imagesMeta || "[]");

    if (req.files && req.files.length > 0) {
      for (const [index, file] of req.files.entries()) {
        const uploaded = await uploadToCloudinary(file.buffer);

        images.push({
          url: uploaded.secure_url,
          public_id: uploaded.public_id,
          caption: meta[index]?.caption || "",
          isMain: meta[index]?.isMain || false,
        });
      }
    }

    // ----------------------------------------
    // TRANSLATE FIELDS
    // ----------------------------------------
    const titleEn = (req.body.title || "").trim();
    const shortDescEn = (req.body.shortDescription || "").trim();
    const descEn = (req.body.description || "").trim();

    const [titleAr, shortDescAr, descAr] = await Promise.all([
      translateToArabic(titleEn),
      translateToArabic(shortDescEn),
      translateToArabic(descEn),
    ]);

    // ----------------------------------------
    // APPLY UPDATES
    // ----------------------------------------
    project.title = { en: titleEn, ar: titleAr || project.title?.ar || titleEn };
    project.shortDescription = {
      en: shortDescEn,
      ar: shortDescAr || project.shortDescription?.ar || shortDescEn,
    };
    project.description = {
      en: descEn,
      ar: descAr || project.description?.ar || descEn,
    };

    project.technologies = JSON.parse(req.body.technologies || "[]");
    project.projectUrl = req.body.projectUrl || "";
    project.category = req.body.category || project.category;
    project.featured = req.body.featured === "true";
    project.features = JSON.parse(req.body.features || "[]");
    project.images = images;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error("UPDATE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================================
// DELETE PROJECT
// ==========================================

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete all images from Cloudinary
    for (const image of project.images) {
      if (image.public_id) {
        try {
          await cloudinary.uploader.destroy(image.public_id);
        } catch (err) {
          console.error("Failed deleting image during project delete:", image.public_id, err);
        }
      }
    }

    await project.deleteOne();

    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error("DELETE PROJECT ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
