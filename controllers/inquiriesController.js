import Inquiry from "../models/inquiry.js";
import { isAdminValid } from "./userControllers.js"; 

// Create a new inquiry
export function createInquiry(req, res) {
    const { user, phone, message } = req.body;

    const newInquiry = new Inquiry({ user, phone, message });

    newInquiry.save().then((result) => {
            res.status(201).json({
                message: "Inquiry created successfully",
                result: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Inquiry creation failed",
                error: err.message
            });
        });
}

// Get all inquiries (Admin only)
export function getAllInquiries(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    Inquiry.find().populate("user", "firstName lastName email").then((inquiries) => {
            res.status(200).json(inquiries);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve inquiries",
                error: err.message
            });
        });
}

// Get an inquiry by ID (Admin only)
export function getInquiryById(req, res) {
    if (!isAdminValid(req)) {  // Check if the user is an admin
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const inquiryId = req.params.id;

    Inquiry.findById(inquiryId).populate("user", "firstName lastName email")
        .then((inquiry) => {
            if (!inquiry) {
                return res.status(404).json({ message: "Inquiry not found" });
            }
            res.status(200).json(inquiry);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve inquiry",
                error: err.message
            });
        });
}

// Update inquiry status (Admin only)
export function updateInquiryStatus(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const inquiryId = req.params.id;
    const { status } = req.body; 

    Inquiry.findByIdAndUpdate(inquiryId, { status }, { new: true }).then((updatedInquiry) => {
            if (!updatedInquiry) {
                return res.status(404).json({ message: "Inquiry not found" });
            }
            res.status(200).json({
                message: "Inquiry status updated successfully",
                updatedInquiry
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update inquiry status",
                error: err.message
            });
        });
}

// Delete an inquiry (Admin only)
export function deleteInquiry(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const inquiryId = req.params.id;

    Inquiry.findByIdAndDelete(inquiryId).then((deletedInquiry) => {
            if (!deletedInquiry) {
                return res.status(404).json({ message: "Inquiry not found" });
            }
            res.status(200).json({ message: "Inquiry deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to delete inquiry",
                error: err.message
            });
        });
}
