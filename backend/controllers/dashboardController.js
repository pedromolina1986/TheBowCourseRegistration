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

export async function getEnrollment(req, res) {
  try {    
    return res.json([
      { program: "Software Development - Diploma", duration: "2 years • Winter Term", students: 68 },
      { program: "Software Development - Post-Diploma", duration: "1 year • Winter Term", students: 45 },
      { program: "Software Development - Certificate", duration: "6 months • Spring Term", students: 43 },
    ]);
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve dashboard enrollments" });
  }
}

export async function getActivities(req, res) {
  try {    
    return res.json([
      { type: "registration", title: "New student registration", description: "Sarah Johnson enrolled in Diploma program", time: "2 hours ago", icon: "UserPlus", colors: "bg-blue-500/10 text-blue-500" },
      { type: "course", title: "Course created", description: "Advanced JavaScript course added", time: "5 hours ago", icon: "Plus", colors: "bg-green-500/10 text-green-500" },
      { type: "form", title: "Form submitted", description: "Michael Chen submitted course inquiry", time: "1 day ago", icon: "Mail", colors: "bg-red-500/10 text-red-500" },
      { type: "update", title: "Course updated", description: "Database Design course schedule modified", time: "2 days ago", icon: "Edit", colors: "bg-purple-500/10 text-purple-500" },
    ]);
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve dashboard activities" });
  }
}

export async function getQuestions(req, res) {
  try {    
    return res.json([
      { name: "Emily Rodriguez", program: "Diploma Program", question: "Question about prerequisite courses for Advanced Database course. When will registration open?", time: "3 hours ago", status: "New" },
      { name: "David Park", program: "Post-Diploma Program", question: "Need clarification on course schedule conflicts between Web Development and Mobile App courses.", time: "1 day ago", status: "Pending" },
      { name: "Lisa Chen", program: "Certificate Program", question: "Payment deadline approaching but unable to access payment portal. Please assist.", time: "2 days ago", status: "Urgent" },
    ]);
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve dashboard activities" });
  }
}
