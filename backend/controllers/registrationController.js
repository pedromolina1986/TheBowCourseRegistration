import sql from "mssql";
import { config } from "../config/dbConfig.js";

async function getPool() {
  if (sql.connected) return sql;
  return sql.connect(config);
}

/* ================================
   POST /api/v1/registrations
   Create a new course registration
================================ */
export async function createRegistration(req, res) {
  try {
    const { studentId, courseId, termId } = req.body;

    if (!studentId || !courseId || !termId) {
      return res.status(400).json({
        error: "studentId, courseId and termId are required",
      });
    }

    const pool = await getPool();

    // Check if already registered
    const check = await pool.request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .input("termId", sql.Int, termId)
      .query(`
        SELECT registration_id FROM CourseRegistration
        WHERE student_id = @studentId AND course_id = @courseId AND term_id = @termId
      `);

    if (check.recordset.length > 0) {
      return res.status(409).json({
        error: "Student already registered for this course",
      });
    }

    // Insert registration
    const result = await pool.request()
      .input("studentId", sql.Int, studentId)
      .input("courseId", sql.Int, courseId)
      .input("termId", sql.Int, termId)
      .input("date", sql.Date, new Date())
      .input("status", sql.NVarChar, "Active")
      .query(`
        INSERT INTO CourseRegistration (student_id, course_id, term_id, registration_date, status)
        OUTPUT INSERTED.*
        VALUES (@studentId, @courseId, @termId, @date, @status)
      `);

    return res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("createRegistration:", err);
    return res.status(500).json({ error: "Failed to register course" });
  }
}

/* ==========================================
   GET /api/v1/registrations/:userId
   List all registered courses for a student
========================================== */
export async function listRegistrations(req, res) {
  try {
    const studentId = Number(req.params.userId);
    if (Number.isNaN(studentId)) {
      return res.status(400).json({ error: "Invalid student ID" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("studentId", sql.Int, studentId)
      .query(`
        SELECT 
          r.registration_id,
          r.registration_date,
          r.status,
          c.course_id,
          c.course_code,
          c.course_name,
          c.credit_hours,
          t.term_name
        FROM CourseRegistration r
        JOIN Course c ON r.course_id = c.course_id
        JOIN Term t ON r.term_id = t.term_id
        WHERE r.student_id = @studentId
        ORDER BY r.registration_date DESC
      `);

    return res.json(result.recordset);
  } catch (err) {
    console.error("listRegistrations:", err);
    return res.status(500).json({ error: "Failed to list registrations" });
  }
}

/* ================================
   DELETE /api/v1/registrations/:id
   Remove a registration
================================ */
export async function deleteRegistration(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid registration ID" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM CourseRegistration
        WHERE registration_id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!result.recordset[0]?.affected) {
      return res.status(404).json({ error: "Registration not found" });
    }

    return res.json({ message: "Registration deleted" });
  } catch (err) {
    console.error("deleteRegistration:", err);
    return res.status(500).json({ error: "Failed to delete registration" });
  }
}
