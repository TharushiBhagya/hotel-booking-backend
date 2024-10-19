import Feedback from "../models/feedback.js";
import { isAdminValid } from "./userControllers.js";

// Create a new feedback
export function createFeedback(req, res) {
    const { user, rating, comment } = req.body;

    const newFeedback = new Feedback({ user, rating, comment });

    newFeedback.save()
        .then((result) => {
            res.status(201).json({
                message: "Feedback created successfully",
                result: result
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Feedback creation failed",
                error: err.message
            });
        });
}

// Get all feedbacks (Admin only)
export function getAllFeedbacks(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    Feedback.find().populate("user", "firstName lastName email")
        .then((feedbacks) => {
            res.status(200).json(feedbacks);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve feedbacks",
                error: err.message
            });
        });
}

// Get feedback by ID (Admin only)
export function getFeedbackById(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const feedbackId = req.params.id;

    Feedback.findById(feedbackId).populate("user", "firstName lastName email")
        .then((feedback) => {
            if (!feedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json(feedback);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve feedback",
                error: err.message
            });
        });
}

// Update feedback response (Admin only)
export function updateFeedbackResponse(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const feedbackId = req.params.id;
    const { response, isApproved } = req.body;

    Feedback.findByIdAndUpdate(feedbackId, { response, responseDate: new Date(), isApproved }, { new: true })
        .then((updatedFeedback) => {
            if (!updatedFeedback) {
                return res.status(404).json({ message: "Feedback not found" });
            }
            res.status(200).json({
                message: "Feedback response updated successfully",
                updatedFeedback
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to update feedback",
                error: err.message
            });
        });
}

// Delete a feedback (Admin only)
export function deleteFeedback(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const feedbackId = req.params.id;

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

// Get all approved feedbacks (Admin only)
export function getApprovedFeedbacks(req, res) {
    if (!isAdminValid(req)) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }

    const minimumRating = 4; 

    Feedback.find({ isApproved: true, rating: { $gte: minimumRating } })
        .populate("user", "firstName lastName email")
        .then((approvedFeedbacks) => {
            res.status(200).json(approvedFeedbacks);
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to retrieve approved feedbacks",
                error: err.message
            });
        });
}
