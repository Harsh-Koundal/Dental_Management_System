import cloudinary from "../../configs/cloudinaryConfig.js";
import Treatments from "../../models/Treatments.js";


// Get All Treatments
export const getTreatments = async(req,res)=>{
    try{
        const treatments = await Treatments.find().sort({
            createdAt:-1,
        });

        res.status(200).json({
            sucess:true,
            treatments,
        });

    }catch(err){
        console.error("Failed to fetch treatments :",err);

        res.status(500).json({
            sucess:false,
            message:"Failed to fetch Treatments",
        });
    }
};


// Create new Treatment 
export const createTreatment = async (req,res)=>{
    try{
        const {name,description,active} = req.body;

        if(!name || !description){
            res.status(400).json({message:"Name & Description of treatment required"});
        }

        let imageUrl = "";
        let imagePublicId = "";

        if(req.file){
            const base64 = `data:${
                req.file.mimetype
            };base64,${req.file.buffer.toString(
                "base64"
            )}`;

            const uploadedImage = await cloudinary.uploader.upload(base64,{
                folder:"treatments",
            });

            imageUrl = uploadedImage.secure_url;
            imagePublicId = uploadedImage.public_id;
        }


        const treatment = await Treatments.create({
            name,
            description,
            image:imageUrl,
            imagePublicId: imagePublicId,
            active,
        });

        res.status(201).json({
            sucess:true,
            treatment,
        });

    }catch(err){
        console.error("Failed to create Treatment:",err);

        res.status(500).json({
            sucess:false,
            message:"Failed to Creata Treatment",
        });
    }
};


// update treatment

export const updateTreatment = async(req,res)=>{
    try{
        const {id} = req.params;

        const updateData = {};

        if(req.body.name){
            updateData.name = req.body.name;
        }

        if(req.body.description){
            updateData.description = req.body.description;
        }

        if(req.body.active !== undefined){
            updateData.active = req.body.active;
        }

        if(req.file){
            const base64 = `data:${
                req.file.mimetype
            };base64,${req.file.buffer.toString(
                "base64"
            )}`;

            const uploadedImage = await cloudinary.uploader.upload(base64,{
                folder:"treatments",
            });

            updateData.image = uploadedImage.secure_url;
            updateData.imagePublicId = uploadedImage.public_id;
        }

        const updatedTreatment = await Treatments.findByIdAndUpdate(
            id,
            {
                $set:updateData,
            },{
                new: true,
                runValidators:true,
            }
        );

        if(!updatedTreatment){
            return res.status(404).json({
                sucess:false,
                message:"Treatment not found",
            });
        }

        res.status(200).json({
            sucess:true,
            treatment:updatedTreatment,
        });
    }catch(err){
        console.error(err);

        res.status(500).json({
            sucess:false,
            message:"Failed to update treatment",
        });
    }
};


// Delete Treatment 
export const deleteTreatment = async(req,res)=>{
    try{
        const {id} = req.params;

        const treatment = await Treatments.findById(id);

        if(!treatment){
            return res.status(404).json({message:"Treatment not found"});
        }

        if(treatment.imagePublicId){
            await cloudinary.uploader.destroy(
                treatment.imagePublicId
            );
        }

        await Treatments.findByIdAndDelete(id);

        res.status(200).json({
            sucess:true,
            message:"Treatment deleted successfully",
        });
    }catch(err){
        console.error(err);
        return res.status(500).json({
            sucess:false,
            message:"Failed to delete treatment",
        });
    }
};