const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  // public_id is optional — new uploads always have it, but
  // we don't want validation to block existing images without one
  public_id: { type: String, default: "" },
  caption: { type: String, default: "" },
  isMain: { type: Boolean, default: false },
});

const translationSchema = new mongoose.Schema(
  {
    en: { type: String, required: true },
    // ar falls back to the English value if translation fails,
    // so it will always be a non-empty string
    ar: { type: String, required: true },
  },
  { _id: false },
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: translationSchema,
      required: true,
    },

    shortDescription: {
      type: translationSchema,
      required: true,
    },

    description: {
      type: translationSchema,
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

    // Plain string array — translation happens at the UI level if needed
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Project", projectSchema);
