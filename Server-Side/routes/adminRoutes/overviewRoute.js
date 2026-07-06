import express from "express";
import { getDashboardOverview } from "../../controllers/adminControllers/overviewController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/overview",authMiddleware,adminMiddleware,getDashboardOverview);

export default router;