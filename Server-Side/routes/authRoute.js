import express from "express";
import { login, logout, signup, VerifyEmail, getProfile } from "../controllers/authController.js";
import { authLimiter, loginLimiter, signupLimiter } from "../middleware/ratelimitMiddleware.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup",signupLimiter,signup);
router.post("/login",loginLimiter,login);
router.get("/verify/:token",authLimiter,VerifyEmail);
router.post("/logout",logout);
router.get("/me", authMiddleware, getProfile);

export default router;