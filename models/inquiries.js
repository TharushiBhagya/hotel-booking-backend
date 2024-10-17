import mongoose from "mongoose";

const inquirySchema=new mongoose.Schema({
      name:{
        type: String,
        required: true
      },
      email:{
        type: String,
        required: true
      },
      phone: {
        type: String
      },
      message:{
        type: String,
        required: true
      },
      inquiryDate: {
        type: Date,
        default: Date.now
      },
      status:{
        type: String,
        enum: ["Pending", "Responded", "Closed"],
        default: "Pending"
      }
});
const Inquiry=mongoose.model("inquiries",inquirySchema);
export default Inquiry;