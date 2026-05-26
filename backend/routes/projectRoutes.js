const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const { protect } = require("../middleware/authMiddleware");

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// PUBLIC
router.get("/", getProjects);

router.get("/:id", getProject);

// ADMIN
router.post("/", protect, upload.array("images"), createProject);

router.put("/:id", protect, upload.array("images"), updateProject);

router.delete("/:id", protect, deleteProject);

module.exports = router;
