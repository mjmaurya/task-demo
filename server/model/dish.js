import mongoose from "mongoose";
import { Schema } from "mongoose";

const DishSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    }
})

export default new mongoose.model("Dish",DishSchema);