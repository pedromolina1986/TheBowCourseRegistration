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
} from "../controllers/userController.js";

const router = express.Router();

// Auth
router.post("/users/register", registerUser);
router.post("/users/login", loginUser);

// Users CRUD
router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.patch("/users/:id", patchUser);
router.delete("/users/:id", deleteUser);

export default router;