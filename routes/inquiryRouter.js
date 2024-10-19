import express from "express";
import {createInquiry, getAllInquiries, getInquiryById, updateInquiryStatus, deleteInquiry} from "../controllers/inquiryController.js";
import { authenticateToken } from "../middleware/authenticateToken.js"; 

const InquiryRouter = express.Router();

InquiryRouter.post("/", createInquiry);
InquiryRouter.get("/", authenticateToken, getAllInquiries);
InquiryRouter.get("/:id", authenticateToken, getInquiryById);
InquiryRouter.put("/:id/status", authenticateToken, updateInquiryStatus);
InquiryRouter.delete("/:id", authenticateToken, deleteInquiry);

export default InquiryRouter;
