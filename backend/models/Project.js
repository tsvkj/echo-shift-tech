const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },

  public_id: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  isMain: {
    type: Boolean,
    default: false,
  },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: [String],

    projectUrl: String,

    category: {
      type: String,
      enum: ["Web", "AI", "Automation", "UI/UX"],
    },

    featured: {
      type: Boolean,
      default: false,
    },

    images: [imageSchema],

    features: [String],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
