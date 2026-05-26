const Project = require("../models/Project");

const cloudinary = require("../config/cloudinary");

const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "portfolio-projects",
      },

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

    let filter = {};

    if (featured === "true") {
      filter.featured = true;
    }

    const projects = await Project.find(filter).sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// CREATE PROJECT
// ==========================================

const createProject = async (req, res) => {
  try {
    let images = [];

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

    const project = await Project.create({
      title: req.body.title,

      shortDescription: req.body.shortDescription,

      description: req.body.description,

      technologies: JSON.parse(req.body.technologies || "[]"),

      projectUrl: req.body.projectUrl,

      category: req.body.category,

      featured: req.body.featured === "true",

      features: JSON.parse(req.body.features || "[]"),

      images,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE PROJECT
// ==========================================

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // =====================================
    // DELETE REMOVED IMAGES FROM CLOUDINARY
    // =====================================

    const deletedImages = JSON.parse(req.body.deletedImages || "[]");

    console.log("Deleted images:", deletedImages);

    for (const publicId of deletedImages) {
      if (!publicId) continue;

      try {
        const result = await cloudinary.uploader.destroy(publicId, {
          resource_type: "image",
        });

        console.log("Cloudinary delete result:", result);
      } catch (err) {
        console.error("Failed deleting image:", publicId, err);
      }
    }

    // =====================================
    // KEEP EXISTING IMAGES
    // =====================================

    let images = JSON.parse(req.body.existingImages || "[]");

    // =====================================
    // ADD NEW IMAGES
    // =====================================

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

    // =====================================
    // UPDATE PROJECT
    // =====================================

    project.title = req.body.title;

    project.shortDescription = req.body.shortDescription;

    project.description = req.body.description;

    project.technologies = JSON.parse(req.body.technologies || "[]");

    project.projectUrl = req.body.projectUrl;

    project.category = req.body.category;

    project.featured = req.body.featured === "true";

    project.features = JSON.parse(req.body.features || "[]");

    project.images = images;

    await project.save();

    res.json(project);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// DELETE PROJECT
// ==========================================

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    // DELETE CLOUDINARY IMAGES

    for (const image of project.images) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    // DELETE MONGODB DOC

    await project.deleteOne();

    res.json({
      message: "Project deleted",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
};
