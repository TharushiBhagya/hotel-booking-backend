import express from "express";
import { createCategory, deleteCategory, getCategory, getCategoryByName, updateCategory } from "../controllers/categoryController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const categoryRouter = express.Router();

categoryRouter.post("/",authenticateToken,createCategory);
categoryRouter.delete("/:name",authenticateToken,deleteCategory);
categoryRouter.get("/:name",getCategoryByName);
categoryRouter.get("/",getCategory);
categoryRouter.put("/:name",authenticateToken,updateCategory);

export default categoryRouter;
