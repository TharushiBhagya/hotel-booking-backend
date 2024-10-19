import express from 'express';
import {createFeedback, getAllFeedbacks, getFeedbackById, updateFeedbackResponse, deleteFeedback, getApprovedFeedbacks} from '../controllers/feedbackController.js'; // Adjust the path as necessary
import { authenticateToken } from '../middleware/authenticateToken.js'; // Adjust the path as necessary

const feedbackRouter = express.Router();

feedbackRouter.post('/', createFeedback);
feedbackRouter.get('/', authenticateToken, getAllFeedbacks);
feedbackRouter.get('/:id', authenticateToken, getFeedbackById);
feedbackRouter.put('/:id/response', authenticateToken, updateFeedbackResponse);
feedbackRouter.delete('/:id', authenticateToken, deleteFeedback);
feedbackRouter.get('/approved', authenticateToken, getApprovedFeedbacks);

export default feedbackRouter;
