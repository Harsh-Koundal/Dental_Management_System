import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    title: String, // e.g. "Invisalign Smile Correction"

    patientName: String, // optional (or anonymous)

    treatmentType: String, // Invisalign, Braces etc.

    duration: String, // e.g. "6 Months"

    description: String, // short story

    beforeImage: String,
    afterImage: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);