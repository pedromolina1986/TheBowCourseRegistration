import express from "express";
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  searchCourses,
} from "../controllers/courseController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);
router.get("/courses/search/:keyword", searchCourses);


// Admin-only actions
router.post("/courses", verifyToken, authorizeAdmin, createCourse);
router.put("/courses/:id", verifyToken, authorizeAdmin, updateCourse);
router.delete("/courses/:id", verifyToken, authorizeAdmin, deleteCourse);



export default router;
