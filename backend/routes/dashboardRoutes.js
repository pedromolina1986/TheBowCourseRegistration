import express from "express";
import {
  getStats,
  getEnrollment,
  getActivities,
  getQuestions,
} from "../controllers/dashboardController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/dashboard/stats/:type", verifyToken, authorizeAdmin, getStats);
router.get("/dashboard/enrollment/:type", verifyToken, authorizeAdmin, getEnrollment);
router.get("/dashboard/activities/:type", verifyToken, authorizeAdmin, getActivities);
router.get("/dashboard/questions/:type", verifyToken, authorizeAdmin, getQuestions);


export default router;
