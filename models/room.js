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
    isAvailable:{
        type:Boolean,
        required:true,
        default:true
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
    isUnderMaintenance: {
        type: Boolean, 
        default: true
    },
    notes:{
        type:String,
        default:""
    }
});
const Room=mongoose.model("rooms",roomSchema);
export default Room;
