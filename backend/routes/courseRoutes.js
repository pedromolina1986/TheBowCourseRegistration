/*
Routes for Advanced APIs
This file defines the route for the advanced operations.
*/

import express from 'express';
import {  
  getCourses
} from '../controllers/courseController.js'; // Import the functions

const router = express.Router();

router.get('/courses', getCourses); 

export default router;
