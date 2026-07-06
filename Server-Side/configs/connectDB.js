import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log("DataBase Connected Successfully");
    }catch(err){
        console.error("DataBasr Connection Failed", err.message);
        process.exit(1);
    }
};

export default connectDB;