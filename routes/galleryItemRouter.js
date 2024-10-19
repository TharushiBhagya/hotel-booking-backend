import express from 'express';
import { createGalleryItem, getGalleryItems } from '../controllers/galleryItemController.js'; 
import { authenticateToken } from "../middleware/authenticateToken.js"; 

const galleryItemRouter = express.Router();

galleryItemRouter.post('/', authenticateToken, createGalleryItem);
galleryItemRouter.get('/', getGalleryItems);

export default galleryItemRouter;
