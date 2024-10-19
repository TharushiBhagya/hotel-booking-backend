import express from 'express';
import { createGalleryItem, getGalleryItems } from '../controllers/galleryItemController.js'; 
import { authenticateToken } from "../middleware/authenticateToken.js"; 

const galleryItemRouter = express.Router();

galleryItemRouter.post('/', createGalleryItem);
galleryItemRouter.get('/',authenticateToken,getGalleryItems);

export default galleryItemRouter;
