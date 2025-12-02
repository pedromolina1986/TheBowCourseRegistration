import express from "express";
import {
  getInstructors,
  getInstructorById,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  searchInstructors,
} from "../controllers/instructorController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/instructors", getInstructors);
router.get("/instructors/:id", getInstructorById);
router.get("/instructors/search/:keyword", searchInstructors);


// Admin-only actions
router.post("/instructors", verifyToken, authorizeAdmin, createInstructor);
router.put("/instructors/:id", verifyToken, authorizeAdmin, updateInstructor);
router.delete("/instructors/:id", verifyToken, authorizeAdmin, deleteInstructor);



export default router;
