/*
Controller for User CRUD Operations
This file handles the CRUD operations for users using SQL queries.
*/

import sql from 'mssql';
import { config } from '../config/dbConfig.js';

// Connect to SQL Server
const connectToSQL = async () => {
  try {
    await sql.connect(config);
    
    sql.on('error', err => {
      console.error('SQL Error: ', err);
    });

  } catch (err) {
    console.error('Error connecting to SQL Server: ', err);  // Log the full error details
    throw new Error('Error connecting to SQL Server:', err);
  }
};

// Get all users
export const getUsers = async (req, res) => {
  try {
    await connectToSQL();
    const result = await sql.query('SELECT * FROM Users');
    console.log('SQL Query Result:', result);
    res.json(result.recordset); // Return the result set
  } catch (err) {
    console.error('Error retrieving users:', err);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  // console.log('Request Body:', req.body);
  const { user_name, user_password, user_type } = req.body;

  // Convert age to a number
  const ageNumber = Number(age);

  // Basic validation
  if (!user_name || typeof user_name !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing name' });
  }
  if (!user_pasasword || typeof user_password !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing password' });
  }
  if (!user_type || typeof user_type !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing type' });
  }
  

  try {
    await connectToSQL();
    await sql.query(`INSERT INTO Users (user_name, user_password, user_type) VALUES ('${user_name}', ${user_password}, '${user_type}')`);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create user' });
  }
};

// Update a user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, user_pasasword, user_type } = req.body;

  try {
    await connectToSQL();
    const result = await sql.query(`UPDATE Users SET user_name = '${user_name}', user_password = ${user_pasasword}, user_type = ${user_type} WHERE id = ${id}`);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};

// Patch (Partial Update) a user
export const patchUser = async (req, res) => {
  const { id } = req.params;
  const { user_name, user_pasasword, user_type } = req.body;

  try {
    await connectToSQL();

    // First, retrieve the current user data to keep unchanged fields
    const currentUserResult = await sql.query(`SELECT * FROM Users WHERE id = ${id}`);
    const currentUser = currentUserResult.recordset[0];

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // If no name is provided, use the existing name from the current user
    const updatedName = user_name !== undefined ? user_name : currentUser.user_name;

    // If no name is provided, use the existing name from the current user
    const updatedPassword = user_password !== undefined ? user_password : currentUser.user_password;

    // If no name is provided, use the existing name from the current user
    const updatedType = user_type !== undefined ? user_type : currentUser.user_type;

    
    // Perform the update with the provided or existing values
    const result = await sql.query(
      `UPDATE Users SET user_name = '${updatedName}', user_password = ${updatedAge}, user_type = ${updatedType} WHERE id = ${id}`
    );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User patched successfully' });
  } catch (err) {
    console.error('Error patching user:', err);
    res.status(500).json({ error: 'Failed to patch user' });
  }
};



// Delete a user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await connectToSQL();
    const result = await sql.query(`DELETE FROM Users WHERE id = ${id}`);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
