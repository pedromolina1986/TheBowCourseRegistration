import express from "express";
import {
  createRegistration,
  listRegistrations,
  deleteRegistration
} from "../controllers/registrationController.js";

const router = express.Router();

// Create
router.post("/registrations", createRegistration);

// List by student
router.get("/registrations/:userId", listRegistrations);

// Delete
router.delete("/registrations/:id", deleteRegistration);

export default router;
