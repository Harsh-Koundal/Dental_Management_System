import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
  imageUrl: String,
  imagePublicId: String,
  month: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

const appointmentSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },

  treatment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Treatment",
  },

  status: {
    type: String,
    enum: ["UPCOMING", "COMPLETED", "MISSED", "CANCELLED"],
    default: "UPCOMING",
  },

  notes: String,
});

const userSchema = new mongoose.Schema(
  {
    // Authentication
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "PATIENT"],
      default: "PATIENT",
    },

    // Personal Info
    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    phone: String,

    dob: Date,

    // Treatment
    activeTreatment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Treatments",
    },

    treatmentStatus: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "MISSED"],
      default: "ACTIVE",
    },

    currentMonthProgress: {
      type: Number,
      default: 0,
    },

    notes: String,

    nextAppointment: Date,

    appointments: [appointmentSchema],

    gallery: [gallerySchema],

    // Account
    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
