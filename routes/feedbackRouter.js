import express from "express";
import {createFeedback, getAllFeedbacks, getFeedbackById, updateFeedbackResponse, deleteFeedback, getApprovedFeedbacks} from "../controllers/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/", getAllFeedbacks);
feedbackRouter.get("/:id", getFeedbackById);
feedbackRouter.put("/:id", updateFeedbackResponse);
feedbackRouter.delete("/:id", deleteFeedback);
feedbackRouter.get("/approved/list", getApprovedFeedbacks);

export default feedbackRouter;
