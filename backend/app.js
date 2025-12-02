/*
Main Application
This file starts the server, connects the routes, and serves the public HTML files.
*/

/*
Main Application
This file starts the server and mounts the routes under /api/v1
*/

import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import cookieParser from "cookie-parser";

// routes
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import registrationRoutes from "./routes/registrationRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import termRoutes from "./routes/termRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js"; 

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Load .env
dotenv.config();

// __dirname setup for ESM 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Body parsers
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ ok: true, service: "Bow Course Registration API", version: "v1" });
});

// Enable CORS for React frontend
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));



app.get("/", (req, res) => {
  res.json({ ok: true, service: "Bow Course Registration API", version: "v1" });
});

// Mount routes 
app.use("/api/v1", userRoutes);
app.use("/api/v1", courseRoutes);
app.use("/api/v1", registrationRoutes);
app.use("/api/v1", messageRoutes);
app.use("/api/v1", dashboardRoutes);
app.use("/api/v1", departmentRoutes);
app.use("/api/v1", termRoutes);
app.use("/api/v1", instructorRoutes);

// 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// centralized error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
