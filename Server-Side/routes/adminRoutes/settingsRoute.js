import express from "express";
import {
  getSettings,
  updateProfile,
  changePassword,
  resetPassword,
} from "../../controllers/adminControllers/settingsController.js";

import {adminMiddleware}  from "../../middleware/adminMiddleware.js";
import {authMiddleware}  from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/settings",authMiddleware, adminMiddleware, getSettings);
router.patch("/settings/profile",authMiddleware, adminMiddleware, updateProfile);
router.patch("/settings/password",authMiddleware, adminMiddleware, changePassword);
router.post("/settings/password/reset",authMiddleware, adminMiddleware, resetPassword);

export default router;