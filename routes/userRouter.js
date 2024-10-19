import express from 'express';
import { postUsers, loginUser, blockUser, unblockUser } from '../controllers/userController.js';
import { authenticateToken } from "../middleware/authenticateToken.js";

const userRouter = express.Router();

userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);
userRouter.put("/:userId/block",authenticateToken, blockUser);
userRouter.put("/:userId/unblock",authenticateToken, unblockUser);

export default userRouter;
