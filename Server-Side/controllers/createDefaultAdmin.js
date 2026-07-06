import bcrypt from "bcrypt";
import User from "../models/User.js";

const DEFAULT_ADMIN = {
  email: "admin@gmail.com",
  password: "password@123",
  Firstname: "Admin",
  Lastname: "User",
  role: "ADMIN",
};

export default async function createDefaultAdmin() {
  try {
    console.log("🔍 Checking for existing Admin...");

    const existingAdmin = await User.findOne({
      email: DEFAULT_ADMIN.email.toLowerCase(),
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      return;
    }

    console.log("🚀 Creating Default Admin...");

    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN.password, 12);

    await User.create({
      email: DEFAULT_ADMIN.email.toLowerCase(),
      passwordHash,
      Firstname: DEFAULT_ADMIN.Firstname,
      Lastname: DEFAULT_ADMIN.Lastname,
      role: DEFAULT_ADMIN.role,
      isVerified: true, // optional (admin should be verified)
    });

    console.log("Default Admin created successfully.");
  } catch (error) {
    console.error("Failed to create Admin:", error);
  }
}