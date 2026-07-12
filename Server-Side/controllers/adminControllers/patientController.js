import cloudinary from "../../configs/cloudinaryConfig.js";
import User from "../../models/User.js";
import mongoose from "mongoose";

export const getAllPatients = async (req, res) => {
    try {
        const { search, status } = req.query;

        let query = {role:"PATIENT"};

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

        const patients = await User.find(query)
            .populate("activeTreatment", "name")
            .sort({ createdAt: -1 });

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
            firstName,
            lastName,
            email,
            phone,
            activeTreatment,
            status,
            nextAppointment,
            notes,
            currentMonthProgress,
            dob
        } = req.body;

        if (!firstName || !lastName || !phone || !activeTreatment || !status) {
            return res.status(400).json({
                success: false,
                message: "Full name, phone, active treatment and status are required."
            });
        }

        const patient = await User.create({
            firstName,
            lastName,
            email,
            phone,
            activeTreatment,
            treatmentStatus:status,
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

        const patient = await User.findById(id).populate("activeTreatment", "name");

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
            {

                ...req.body,
                treatmentStatus:req.body.status?.toUpperCase(),
            },
            {
                returnDocument: "after",
                runValidators:true,
            }
        );

        if(!patient){
            return res.status(404).json({sucess:false,message:"Patient not found"});
        }

        await patient.populate("activeTreatment", "name");

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

        const monthIndex = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ].indexOf(month);
        const dayNumber = Number(day);

        if (monthIndex === -1 || !Number.isInteger(dayNumber) || dayNumber < 1 || dayNumber > 31) {
            return res.status(400).json({
                success: false,
                message: "A valid appointment month and day are required"
            });
        }

        const today = new Date();
        let appointmentDate = new Date(today.getFullYear(), monthIndex, dayNumber);

        // Reject invalid dates such as February 30 instead of allowing JavaScript to roll them over.
        if (appointmentDate.getMonth() !== monthIndex || appointmentDate.getDate() !== dayNumber) {
            return res.status(400).json({
                success: false,
                message: "The appointment date is invalid"
            });
        }

        // A selected date earlier this year is the next occurrence in the following year.
        if (appointmentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
            appointmentDate = new Date(today.getFullYear() + 1, monthIndex, dayNumber);
        }

        const patient = await User.findByIdAndUpdate(
            id,
            {
                nextAppointment: appointmentDate
            },
            {
                returnDocument: "after"
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
