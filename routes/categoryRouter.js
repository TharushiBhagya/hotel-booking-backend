import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const categoryRouter = express.Router();
categoryRouter.post('/',authenticateToken,createCategory);

export default categoryRouter;