import express from "express";
import {
  getTerms,
  getTermById,
  createTerm,
  updateTerm,
  deleteTerm,
  searchTerms,
  getCurrentStudentTerm,
  updateCurrentStudentTerm,
} from "../controllers/termController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";

const router = express.Router();

// Public / basic term listing for students & admins
router.get("/terms", getTerms);
router.get("/terms/:id", getTermById);
router.get("/terms/search/:keyword", searchTerms);

// Student: get & update MY selected term
router.get("/students/me/term", verifyToken, getCurrentStudentTerm);
router.patch("/students/me/term", verifyToken, updateCurrentStudentTerm);

// Admin-only actions (manage terms)
router.post("/terms", verifyToken, authorizeAdmin, createTerm);
router.put("/terms/:id", verifyToken, authorizeAdmin, updateTerm);
router.delete("/terms/:id", verifyToken, authorizeAdmin, deleteTerm);

export default router;
