import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  getLoggedInUserDetails,
  patchLoggedInUser,
} from "../controllers/userController.js";
import { authorizeAdmin, verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Auth
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// Logged-in details
router.get("/users/me", verifyToken, getLoggedInUserDetails);
router.patch("/users/me", verifyToken, patchLoggedInUser);


// Admin-only Routes
router.get("/users", verifyToken, authorizeAdmin, getUsers);
router.get("/users/:id", verifyToken, authorizeAdmin, getUserById);
router.post("/users", verifyToken, authorizeAdmin, createUser);
router.put("/users/:id", verifyToken, authorizeAdmin, updateUser);
router.patch("/users/:id", verifyToken, authorizeAdmin, patchUser);
router.delete("/users/:id", verifyToken, authorizeAdmin, deleteUser);



export default router;