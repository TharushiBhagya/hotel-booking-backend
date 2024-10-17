import mongoose from "mongoose";

const roomSchema=new mongoose.Schema({
    roomNumber:{
        type:String,
        required:true,
        unique:true
    },
    Category:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    bookedDates:[
        {
            start:{
                type:Date,
                required: true               
            },
            end:{
                type:Date,
                required: true  
            },
        },
    ],
    description:{
        type:String
    },
    images:{
        type:[String],     
    }
});
const Room=mongoose.model("rooms",roomSchema);
export default Room;
