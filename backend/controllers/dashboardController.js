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
    const pool = await getPool();
    
    // Check base user
    const statsQuery = await pool.request()
      .query(`
        SELECT
          (SELECT COUNT(1) FROM Student) AS students,
          (SELECT COUNT(1) FROM Course) AS courses,
          (SELECT COUNT(1) FROM SubmittedForms) AS forms       
      `);

    const stats = statsQuery.recordset[0];
        
    return res.json([
      { label: "Total Students", value: stats.students, change: "+12 this month", icon: "Users", colors: "text-blue-300" },
      { label: "Active Courses", value: stats.courses, change: "+3 this term", icon: "BarChart3", colors: "text-green-300" },
      { label: "Programs", value: "3", change: "Diploma, Post-Diploma, Certificate", icon: "GraduationCap", colors: "text-purple-300" },
      { label: "Pending Forms", value: stats.forms, change: "2 urgent", icon: "Mail", colors: "text-red-300" },
    ]);
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve dashboard stats" });
  }
}

export async function getEnrollment(req, res) {
  try {    

    const pool = await getPool();
    
    // Check base user
    const enrollmentsQuery = await pool.request()
      .query(`
            SELECT
              c.course_name,
              t.term_name,
              COUNT(c.course_name) total_registrations
            FROM
              CourseRegistration cr
              JOIN Course c ON c.course_id = cr.course_id
              JOIN Term t ON t.term_id = cr.term_id
            GROUP BY
              c.course_name, t.term_name
            ORDER BY
              total_registrations DESC
      `);

    const enrollments = enrollmentsQuery.recordset;
    
    let enrollmentData = [];

    enrollments.forEach(enr => {
      enrollmentData.push({ program: enr.course_name, duration: enr.term_name, students: enr.total_registrations });
    });
      
    return res.json(enrollmentData);

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

    const pool = await getPool();
    
    // Check base user
    const formsQuery = await pool.request()
      .query(`
            SELECT TOP 3 
              sf.subject,
              sf.issue_description,
              sf.submission_date,
              sf.status,
              s.program,
              s.first_name,
              s.last_name
            FROM 
              SubmittedForms sf
              JOIN Student s ON s.student_id = sf.student_id
            ORDER BY 
              sf.form_id DESC
      `);

    const forms = formsQuery.recordset;
    
    let formsData = [];

    forms.forEach(enr => {
      formsData.push({ name: `${enr.first_name} ${enr.last_name}`, program: enr.program, question: enr.issue_description, time: enr.submission_date, status: enr.status})
    });
      
    return res.json(formsData);
        
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve dashboard activities" });
  }
}
