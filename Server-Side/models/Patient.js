import mongoose, { mongo } from "mongoose";

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    activeTreatment:{
        type:String
    },
    status:{
        type:String,
        enum:["Active","Completed","Missed"],
        default:"Active"
    },
    dob:Date,

    notes:String,

    currentMonthProgress:{
        type:Number,
        default:0
    },

    nextAppointment:{
        month:String,
        day:Number
    },

    gallery: [
    {
        imageUrl: String,
        imagePublicId: String,
        month: String,
        uploadedAt: {
            type: Date,
            default: Date.now
        }
    }
]
},{
    timestamps:true
});

export default mongoose.model("patientSchema", patientSchema);