import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// 1. Get Settings
export const getSettings = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized - No userId" });
    }

    const user = await User.findById(req.userId).select("-passwordHash");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      data: {
        user: {
          ...user.toObject(),
          name: `${user.Firstname} ${user.Lastname}`,
          status: user.isBlocked ? "blocked" : "active",
        },
      },
    });
  } catch (err) {
    console.error("GET SETTINGS ERROR:", err);
    res.status(500).json({ message: "Failed to load settings" });
  }
};

// 2. Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const [Firstname, ...rest] = name.split(" ");
    const Lastname = rest.join(" ");

    const user = await User.findByIdAndUpdate(
      req.userId,
      { Firstname, Lastname },
      { new: true }
    ).select("-passwordHash");

    res.json({
      message: "Profile updated",
      user: {
        ...user.toObject(),
        name: `${user.Firstname} ${user.Lastname}`,
      },
    });
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// 3. Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId).select("+passwordHash");

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password incorrect" });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch {
    res.status(500).json({ message: "Password update failed" });
  }
};

// 4. Reset Password
export const resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("+passwordHash");

    const tempPassword = crypto.randomBytes(4).toString("hex");

    user.passwordHash = await bcrypt.hash(tempPassword, 10);
    await user.save();

    console.log(`Temp password for ${user.email}: ${tempPassword}`);

    res.json({ message: "Temporary password sent to email" });
  } catch {
    res.status(500).json({ message: "Reset failed" });
  }
};