/*
Advanced CRUD with JOIN queries
This file handles advanced operations with joins between users and orders.
*/

import sql from "mssql";
import { config } from "../config/dbConfig.js";

// Get users with their orders (JOIN example)
export const getCourses = async (req, res) => {
  try {
    await sql.connect(config);
    /*const result = await sql.query(`
      SELECT u.id, u.name, o.orderDate, o.amount 
      FROM Users u
      JOIN Orders o ON u.id = o.userId
    `); // Join Users and Orders tables*/
    res.json({}); // Return the result set
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users with orders" });
  }
};

