import Feedback from '../models/feedback.js';
import { isAdminValid } from './userControllers.js'; 

// Create new feedback (coomon for both admins and customers)
export function createFeedback(req, res) {
    const newFeedback = new Feedback(req.body);

    newFeedback.save().then((result) => {
            res.status(201).json({
                message: "Feedback created successfully",
                feedback: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Feedback creation failed",
                error: err.message
            });
        });
}

// Get all approved feedback (Admin only)
export function getAllApprovedFeedback(req, res) {
    Feedback.find({ isApproved: true }).then((feedbacks) => {
            res.status(200).json({
                feedbacks
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve feedbacks",
                error: err.message
            });
        });
}

// Update feedback status (Admin only)
export function updateFeedbackStatus(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const feedbackId = req.params.feedbackId; 
    const { isApproved } = req.body; 

    Feedback.findByIdAndUpdate(feedbackId, { isApproved }, { new: true })
        .then((updatedFeedback) => {
            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json({
                message: "Feedback status updated successfully",
                feedback: updatedFeedback
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update feedback status",
                error: err.message
            });
        });
}

// Delete feedback (Admin only)
export function deleteFeedback(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const feedbackId = req.params.feedbackId; 

    Feedback.findByIdAndDelete(feedbackId)
        .then((deletedFeedback) => {
            if (!deletedFeedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json({ message: "Feedback deleted successfully" });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to delete feedback",
                error: err.message
            });
        });
}
