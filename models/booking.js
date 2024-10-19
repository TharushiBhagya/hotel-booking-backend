import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
      BookinId:{
        type:String,
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