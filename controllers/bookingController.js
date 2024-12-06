import Booking from "../models/booking.js";
import { isAdminValid, isCustomerValid } from "./userController.js"; 

// Create a new booking (Coomon for both admins and customers)
export function createBooking(req, res) {
    if(!isCustomerValid(req)){
        res.status(403).json({
            message:"Forbidden"
        })
        return
    }

    const startingId=1200;

    Booking.countDocuments({}).then((count)=>{
        const newId="INV"+startingId+count+1;
        const newBooking = new Booking({
            bookingId:newId,
            roomId:req.body.roomId,
            email:req.user.email,
            start:req.user.start,
            end:req.user.end
        });
        newBooking.save()
        .then((result) => {
            res.status(201).json({
                message: "Booking created successfully",
                booking: result
            });
        }).catch((err) => {
            res.status(500).json({
                message: "Booking creation failed",
                error: err.message
            })
        })
    })   
}

// Get all bookings (Admin only)
export function getAllBookings(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        })
    }

    Booking.find().populate("room")
        .then((bookings) => {
            res.status(200).json({
                bookings
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve bookings",
                error: err.message
            });
        });
}

// Update a booking's status (Admin only)
export function updateBookingStatus(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const bookingId = req.params.bookingId; 
    const { bookingStatus } = req.body;

    Booking.findByIdAndUpdate(bookingId, { bookingStatus }, { new: true })
        .then((updatedBooking) => {
            if (!updatedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({
                message: "Booking status updated successfully",
                booking: updatedBooking
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update booking status",
                error: err.message
            });
        });
}

// Delete a booking (Admin only)
export function deleteBooking(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const bookingId = req.params.bookingId; 

    Booking.findByIdAndDelete(bookingId)
        .then((deletedBooking) => {
            if (!deletedBooking) {
                return res.status(404).json({ message: "Booking not found" });
            }
            res.status(200).json({ message: "Booking deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to delete booking",
                error: err.message
            });
        });
}
