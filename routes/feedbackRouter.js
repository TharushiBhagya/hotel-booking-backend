import express from 'express';
import {createFeedback, getAllApprovedFeedback, updateFeedbackStatus, deleteFeedback} from '../controllers/feedbackController.js';
import { authenticateToken } from '../middleware/authenticateToken.js'; 

const feedbackRouter = express.Router();

feedbackRouter.post("/", createFeedback);
feedbackRouter.get("/approved", authenticateToken, getAllApprovedFeedback);
feedbackRouter.put("/:feedbackId/status", authenticateToken, updateFeedbackStatus);
feedbackRouter.delete("/:feedbackId", authenticateToken, deleteFeedback);

export default feedbackRouter;
