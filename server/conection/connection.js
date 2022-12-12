import mongoose from "mongoose";
export const connect=async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
    } catch (error) {
        throw error;
    }
}