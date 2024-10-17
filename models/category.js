import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    pricePerNight:{
        type:String,
        required:true,
        min:0
    },
    maxOccupancy:{
        type:Number,
        required:true,
        min:1
    },
    amenities:{
        type:[String],
        default:[]
    },
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
    },
    image:{
        type:String
    }
});
const Category=mongoose.model("categories",categorySchema);
export default Category;