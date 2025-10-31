/*
Main Application
This file starts the server, connects the routes, and serves the public HTML files.
*/

import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Load .env file
dotenv.config();

// Setup for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url); // Converts the URL of the current module (import.meta.url) into a file path.
const __dirname = dirname(__filename); // Extracts the directory path of the current file.

const app = express();
app.use(express.json()); // Middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Middleware for form data (URL-encoded)


// Serve static HTML files from the "public" folder (any file inside the public folder can be accessed by the browser directly)
app.use(express.static('public'));

// Use the user and order routes
app.use('/api/v1', userRoutes);
app.use('/api/v1', courseRoutes); 


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

/*
- process.env.PORT: This accesses an environment variable called PORT using process.env. 
Environment variables are variables that come from the system (your computer or the server where your app is running), and they allow configuration without hard-coding values into the application.

By using process.env.PORT, the code allows the app to run on different environments (production environment or development environment)
*/

/*
Middleware refers to functions that execute during the request-response cycle. Middleware functions have access to the request (req) and response (res) objects, as well as the next middleware function in the application's cycle.
*/