import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    roomNumber:{
        type:Number,
        required:true,
        unique:true
    },
    category:{
        type: String,
        enum:["Standard","Deluxe","Luxury"],
        required:true
    },
    maxGuests:{
        type:Number,
        required:true,
        default:3,
        min:1
    },
    status: {
        type: String,
        enum: ["available", "underMaintenance", "unavailable"],
        required: true,
        default: "available" 
    },
    photos:[
        {
            type:String
        }
    ],
    specialDescription:{
        type:String,
        default:""
    },
    notes:{
        type:String,
        default:""
    }
});
const Room=mongoose.model("rooms",roomSchema);
export default Room;
