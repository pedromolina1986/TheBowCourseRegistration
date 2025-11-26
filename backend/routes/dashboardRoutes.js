import express from "express";
import {
  getStats
} from "../controllers/dashboardController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/dashboard/stats/:type", getStats);


export default router;
