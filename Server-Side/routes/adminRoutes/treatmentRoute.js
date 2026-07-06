import express from "express";
import { createTreatment, getTreatments, updateTreatment, deleteTreatment } from "../../controllers/adminControllers/treatmentController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";
import upload from "../../middleware/multerMiddleware.js";


const router = express.Router();

router.get("/",authMiddleware,adminMiddleware,getTreatments);

router.post("/create",authMiddleware,adminMiddleware,upload.single("image"),createTreatment);

router.patch("/update/:id",authMiddleware,adminMiddleware,upload.single("image"),updateTreatment);

router.delete("/delete/:id",authMiddleware,adminMiddleware,deleteTreatment);


export default router;