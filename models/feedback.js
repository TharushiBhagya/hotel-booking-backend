import { response } from "express";
import mongoose from "mongoose";

const feedbackSchema=new mongoose.Schema({
    guestName: {
        type: String,
        required: true
    },
    guestEmail: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment:{
        type: String,
        required: true
    },
    feedbackDate: {
        type: Date,
        default: Date.now
    },
    response:{
        type:String
    },
    responseDate:{
        type:Date
    }
});
const Feedback=mongoose.model("feedbacks",feedbackSchema);
export default Feedback;