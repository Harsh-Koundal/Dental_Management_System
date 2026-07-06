import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  url: String,
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
  status: {
    type: String,
    enum: ["UPCOMING", "COMPLETED", "MISSED"],
    default: "UPCOMING",
  },
  notes: String,
});

const userSchema = new mongoose.Schema(
  {
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },

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
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    gallery: [photoSchema],

    nextAppointment: {
      type: Date,
    },

    appointments: [appointmentSchema],

    isVerified: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);