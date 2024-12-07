import express from "express";
import { postUsers, loginUser, blockUser, unblockUser, getUser } from '../controllers/userController.js';
import { authenticateToken } from "../middleware/authenticateToken.js";

const userRouter = express.Router();

userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
userRouter.get("/",getUser);
userRouter.put("/:userId/block",authenticateToken, blockUser);
userRouter.put("/:userId/unblock",authenticateToken, unblockUser);

export default userRouter;
