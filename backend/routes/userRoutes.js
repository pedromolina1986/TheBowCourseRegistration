/*
Routes for User APIs
This file defines the routes for the user-related operations.
*/

import express from 'express';
import { getUsers, createUser, updateUser, patchUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

// Define routes
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.patch('/users/:id', patchUser);
router.delete('/users/:id', deleteUser);

export default router;
