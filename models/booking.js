import mongoose from "mongoose";
import Category from "./category";

const bookingSchema=new mongoose.Schema({
      room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Room",
        required:true
      },
      Category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
      },
      guestName:{
        type:String,
        required:true
      },
      guestEmail:{
        type:String,
        required:true
      },
      guestPhone:{
        type:String,
        required:true
      },
      checkInDate:{
        type:Date,
        required:true
      },
      checkOutDate:{
        type:Date,
        required:true
      },
      totalPrice:{
        type:Number,
        required:true,
        min:0
      },
      bookingStatus:{
        type:String,
        required:true,
        enum:["Pending","Confirmed","Cancelled"],
        default:"Pending"
      }
});
const Booking=mongoose.model("bookings",bookingSchema);
export default Booking;