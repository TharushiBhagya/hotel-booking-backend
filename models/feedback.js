import mongoose from "mongoose";

const feedbackSchema=new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
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
        required: true,
        maxlength: 500
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
    },
    isApproved: {  
        type: Boolean,
        default: false  
    }
});
const Feedback=mongoose.model("feedbacks",feedbackSchema);
export default Feedback;