// models/ticket.js
import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
    ticketNumber: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false // Optional, if the ticket is for an event
    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'used'],
        default: 'active'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model('Ticket', TicketSchema);
export default Ticket;
