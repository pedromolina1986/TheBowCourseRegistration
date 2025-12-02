import express from "express";
import {
  getTerms,
  getTermById,
  createTerm,
  updateTerm,
  deleteTerm,
  searchTerms,
} from "../controllers/termController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/terms", getTerms);
router.get("/terms/:id", getTermById);
router.get("/terms/search/:keyword", searchTerms);


// Admin-only actions
router.post("/terms", verifyToken, authorizeAdmin, createTerm);
router.put("/terms/:id", verifyToken, authorizeAdmin, updateTerm);
router.delete("/terms/:id", verifyToken, authorizeAdmin, deleteTerm);



export default router;
