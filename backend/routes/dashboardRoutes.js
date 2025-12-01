import express from "express";
import {
  getStats,
  getEnrollment,
  getActivities,
  getQuestions,
} from "../controllers/dashboardController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/dashboard/stats/:type", verifyToken, getStats);
router.get("/dashboard/enrollment/:type", verifyToken, getEnrollment);
router.get("/dashboard/activities/:type", verifyToken, getActivities);
router.get("/dashboard/questions/:type", verifyToken, getQuestions);


export default router;
