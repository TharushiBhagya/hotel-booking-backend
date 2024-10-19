import express from "express";
import {createInquiry, getAllInquiries, getInquiryById, updateInquiryStatus, deleteInquiry} from "../controllers/inquiryController.js";

const InquiryRouter = express.Router();

InquiryRouter.post("/", createInquiry);
InquiryRouter.get("/", getAllInquiries);
InquiryRouter.get("/:id", getInquiryById);
InquiryRouter.put("/:id/status", updateInquiryStatus);
InquiryRouter.delete("/:id", deleteInquiry);

export default InquiryRouter;
