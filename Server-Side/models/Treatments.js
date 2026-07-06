import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },
        
        imagePublicId: {
            type: String,
            default: "",
        },

        active: {
            type: Boolean,
            default: true,
        },
    }, {
    timestamps: true,
}
);

export default mongoose.model("Treatments", treatmentSchema);