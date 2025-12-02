import express from "express";
import {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  searchDepartments,
} from "../controllers/departmentController.js";
import { verifyToken, authorizeAdmin } from "../middleware/auth.js";



const router = express.Router();

router.get("/departments", getDepartments);
router.get("/departments/:id", getDepartmentById);
router.get("/departments/search/:keyword", searchDepartments);


// Admin-only actions
router.post("/departments", verifyToken, authorizeAdmin, createDepartment);
router.put("/departments/:id", verifyToken, authorizeAdmin, updateDepartment);
router.delete("/departments/:id", verifyToken, authorizeAdmin, deleteDepartment);



export default router;
