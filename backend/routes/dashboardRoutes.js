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
router.get("/dashboard/enrollment/:type", getEnrollment);
router.get("/dashboard/activities/:type", getActivities);
router.get("/dashboard/questions/:type", getQuestions);


export default router;
