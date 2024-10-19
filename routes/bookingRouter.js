import express from 'express';
import {createBooking, getAllBookings, updateBookingStatus, deleteBooking} from '../controllers/bookingController.js';
import { authenticateToken } from "../middleware/authenticateToken.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get('/bookings',authenticateToken, getAllBookings);
bookingRouter.put('/bookings/:bookingId/status',authenticateToken, updateBookingStatus);
bookingRouter.delete('/bookings/:bookingId',authenticateToken, deleteBooking);

export default bookingRouter;
