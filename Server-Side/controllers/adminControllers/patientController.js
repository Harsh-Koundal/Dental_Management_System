import cloudinary from "../../configs/cloudinaryConfig.js";
import User from "../../models/User.js";
import mongoose from "mongoose";

export const getAllPatients = async (req, res) => {
    try {
        const { search, status } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
                { activeTreatment: { $regex: search, $options: "i" } }
            ];
        }

        if (status && status !== "all") {
            query.status = status;
        }

        const patients = await User.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: patients.length,
            patients
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch patients"
        });
    }
};


export const createPatient = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            activeTreatment,
            status,
            nextAppointment,
            notes,
            currentMonthProgress,
            dob
        } = req.body;

        if (!fullName || !phone || !activeTreatment || !status) {
            return res.status(400).json({
                success: false,
                message: "Full name, phone, active treatment and status are required."
            });
        }

        const patient = await User.create({
            name: fullName,
            email,
            phone,
            activeTreatment,
            status,
            notes,
            dob,
            currentMonthProgress: currentMonthProgress || 0,
            nextAppointment: nextAppointment || {
                month: "",
                day: ""
            },
            gallery: []
        });

        return res.status(201).json({
            success: true,
            message: "Patient created successfully.",
            patient
        });

    } catch (err) {
        console.error("Error creating patient:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to create patient."
        });
    }
};

export const getPatientById = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid patient id"
            });
        }

        const patient = await User.findById(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            patient
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch patient"
        });
    }
};



export const updatePatient = async(req,res)=>{
    try{
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success:false,message:"Invalid patient id"});
        }

        const patient = await User.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true,
                runValidators:true,
            }
        );

        if(!patient){
            return res.status(404).json({sucess:false,message:"Patient not found"});
        }

        res.status(200).json({sucess:true,message:"Patient updated successfully",patient});
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to update patient"
        });
    }
}


export const deletePatient = async (req, res) => {

    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid patient id"
            });
        }

        const patient = await User.findByIdAndDelete(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient deleted successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to delete patient"
        });
    }

};


export const updateAppointment = async (req, res) => {

    try {

        const { id } = req.params;
        const { month, day } = req.body;

        const patient = await User.findByIdAndUpdate(
            id,
            {
                nextAppointment: {
                    month,
                    day
                }
            },
            {
                new: true
            }
        );

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            patient
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to update appointment"
        });

    }

};



export const getPatientStats = async (req, res) => {

    try {

        const totalPatients = await User.countDocuments();

        const activePatients = await User.countDocuments({
            status: "Active"
        });

        const completedPatients = await User.countDocuments({
            status: "Completed"
        });

        const missedPatients = await User.countDocuments({
            status: "Missed"
        });

        res.status(200).json({
            success: true,
            stats: {
                totalPatients,
                activePatients,
                completedPatients,
                missedPatients
            }
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to fetch stats"
        });

    }

};

export const uploadGallery = async (req, res) => {
    try {

        const { id } = req.params;
        const { month } = req.body;

        const patient = await User.findById(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image."
            });
        }

        const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

        const uploadedImage = await cloudinary.uploader.upload(base64, {
            folder: "UserGallery"
        });

        patient.gallery.push({
            imageUrl: uploadedImage.secure_url,
            imagePublicId: uploadedImage.public_id,
            month,
            uploadedAt: new Date()
        });

        await patient.save();

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully.",
            gallery: patient.gallery
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Upload failed."
        });
    }
};

export const deleteGalleryImage = async (req, res) => {
    try {

        const { id, imageId } = req.params;

        const patient = await User.findById(id);

        if (!patient) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        const image = patient.gallery.id(imageId);

        if (!image) {
            return res.status(404).json({
                success: false,
                message: "Image not found"
            });
        }

        // Delete from Cloudinary
        if (image.imagePublicId) {
            await cloudinary.uploader.destroy(image.imagePublicId);
        }

        // Remove from MongoDB
        patient.gallery.pull(imageId);

        await patient.save();

        return res.status(200).json({
            success: true,
            message: "Image deleted successfully."
        });

    } catch (err) {
        console.error("Delete gallery image error:", err);

        return res.status(500).json({
            success: false,
            message: "Failed to delete image."
        });
    }
};