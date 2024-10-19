import express from 'express';
import { createGalleryItem, getGalleryItems } from '../controllers/galleryItemController.js'; 
import { authenticateToken } from "../middleware/authenticateToken.js"; 

const router = express.Router();

router.use(authenticateToken);
router.post('/', createGalleryItem);
router.get('/', getGalleryItems);

export default router;
