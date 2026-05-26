export interface ProjectImage {
  id?: string;

  _id?: string;

  url: string;

  public_id?: string;

  caption?: string;

  isMain?: boolean;

  file?: File;
}

export interface Project {
  _id?: string;

  title: string;

  shortDescription: string;

  description: string;

  technologies: string[];

  projectUrl: string;

  category: "Web" | "AI" | "Automation" | "UI/UX";

  featured: boolean;

  images: ProjectImage[];

  features: string[];

  createdAt?: number | string;
}

const API_URL = "http://localhost:5000/api/projects";

function getToken() {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("portfolio.auth.v1");
}

export const projectsService = {
  // ======================================
  // GET ALL
  // ======================================

  async list(): Promise<Project[]> {
    const res = await fetch(API_URL);

    if (!res.ok) {
      throw new Error("Failed to fetch projects");
    }

    return res.json();
  },

  // ======================================
  // FEATURED
  // ======================================

  async featured(): Promise<Project[]> {
    const res = await fetch(`${API_URL}?featured=true`);

    if (!res.ok) {
      throw new Error("Failed to fetch featured projects");
    }

    return res.json();
  },

  // ======================================
  // GET SINGLE
  // ======================================

  async get(id: string) {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch project");
    }

    return res.json();
  },

  // ======================================
  // CREATE
  // ======================================

  async create(project: Partial<Project>) {
    const formData = this.toFormData(project);

    const res = await fetch(API_URL, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },

      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();

      throw new Error(err.message || "Failed to create project");
    }

    return res.json();
  },

  // ======================================
  // UPDATE
  // ======================================

  async update(id: string, project: Partial<Project>, deletedImages: string[] = []) {
    const formData = this.toFormData(project, deletedImages);

    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },

      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();

      throw new Error(err.message || "Failed to update project");
    }

    return res.json();
  },

  // ======================================
  // DELETE
  // ======================================

  async remove(id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete project");
    }

    return res.json();
  },

  // ======================================
  // FORM DATA
  // ======================================

  toFormData(project: Partial<Project>, deletedImages: string[] = []) {
    const formData = new FormData();

    formData.append("title", project.title || "");

    formData.append("shortDescription", project.shortDescription || "");

    formData.append("description", project.description || "");

    formData.append("projectUrl", project.projectUrl || "");

    formData.append("category", project.category || "Web");

    formData.append("featured", String(project.featured));

    formData.append("technologies", JSON.stringify(project.technologies || []));

    formData.append("features", JSON.stringify(project.features || []));

    // ====================================
    // EXISTING IMAGES
    // ====================================

    const existingImages = (project.images || [])
      .filter((img) => !img.file)
      .map((img) => ({
        url: img.url,

        public_id: img.public_id,

        caption: img.caption || "",

        isMain: img.isMain || false,
      }));

    formData.append("existingImages", JSON.stringify(existingImages));

    // ====================================
    // DELETED IMAGES
    // ====================================

    formData.append("deletedImages", JSON.stringify(deletedImages));

    const newImagesMeta = (project.images || [])
      .filter((img) => img.file)
      .map((img) => ({
        caption: img.caption || "",
        isMain: img.isMain || false,
      }));

    formData.append("imagesMeta", JSON.stringify(newImagesMeta));

    // ====================================
    // NEW FILES
    // ====================================

    project.images?.forEach((img) => {
      if (img.file) {
        formData.append("images", img.file);
      }
    });

    return formData;
  },
};
