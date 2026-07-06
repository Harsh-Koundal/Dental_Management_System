import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },

    title: String,

    category: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);