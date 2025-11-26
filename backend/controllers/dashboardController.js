/*
Course CRUD + search (SQL Server, parameterized)
*/

import sql from "mssql";
import { config } from "../config/dbConfig.js";

async function getPool() {
  if (sql.connected) return sql;
  return sql.connect(config);
}

/* =========================
   LIST / FILTER
   ========================= */

// GET /api/v1/dashboard?type=admin||student
export async function getStats(req, res) {
  try {    
    return res.json([
      { label: "Total Students", value: "200", change: "+12 this month", icon: "Users", colors: "text-blue-300" },
      { label: "Active Courses", value: "24", change: "+3 this term", icon: "BarChart3", colors: "text-green-300" },
      { label: "Programs", value: "3", change: "Diploma, Post-Diploma, Certificate", icon: "GraduationCap", colors: "text-purple-300" },
      { label: "Pending Forms", value: "8", change: "2 urgent", icon: "Mail", colors: "text-red-300" },
    ]);
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve dashboard stats" });
  }
}
