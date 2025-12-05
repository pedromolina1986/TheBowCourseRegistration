import express from "express";
import { submitMessage, listMessages, respondMessage } from "../controllers/messageController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// Students submit message
router.post("/messages", verifyToken, submitMessage);

// Admin list messages
router.get("/messages", verifyToken, authorizeAdmin, listMessages);

// Admin responds to a message
router.patch("/messages/:id", verifyToken, authorizeAdmin, respondMessage);

export default router;
