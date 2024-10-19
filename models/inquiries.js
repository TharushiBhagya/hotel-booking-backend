import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", 
        required: true
    },
    phone: {
        type: String
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000 
    },
    inquiryDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["Pending", "Responded", "Closed"],
        default: "Pending"
    }
});

const Inquiry = mongoose.model("inquiries", inquirySchema);
export default Inquiry;
