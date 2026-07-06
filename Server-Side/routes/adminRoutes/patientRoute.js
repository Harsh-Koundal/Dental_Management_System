import express from "express";
import upload from "../../middleware/multerMiddleware.js"

import {
    getAllPatients,
    createPatient,
    getPatientById,
    updatePatient,
    deletePatient,
    updateAppointment,
    getPatientStats,
    uploadGallery,
    deleteGalleryImage
} from "../../controllers/adminControllers/patientController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { adminMiddleware } from "../../middleware/adminMiddleware.js";

const router = express.Router();

router.use(authMiddleware,adminMiddleware);

// Dashboard
router.get("/stats", getPatientStats);

// Patient CRUD
router.get("/", getAllPatients);
router.get("/:id", getPatientById);
router.post("/", createPatient);
router.put("/:id", updatePatient);
router.delete("/:id", deletePatient);

// Appointment
router.patch("/:id/appointment", updateAppointment);

// Gallery
router.post(
    "/:id/gallery",
    upload.array("image"),  
    uploadGallery
);

router.delete(
    "/:id/gallery/:imageId",
    deleteGalleryImage
);

export default router;