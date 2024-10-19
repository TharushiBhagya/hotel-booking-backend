import express from "express";
import { createRoom, searchRoomByNumber, updateRoom, deleteRoom } from "../controllers/categoryController.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const categoryRouter = express.Router();

categoryRouter.post("/",authenticateToken,createRoom);
categoryRouter.get("/category/:category",searchRoomByNumber);
categoryRouter.put("/:number",authenticateToken,updateRoom);
categoryRouter.delete("/:number",deleteRoom);

export default categoryRouter;
