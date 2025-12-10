import sql from "mssql";
import { config } from "../config/dbConfig.js";

async function getPool() {
  if (sql.connected) return sql;
  return sql.connect(config);
}


//    POST /api/v1/messages
//    Student sends a message
export async function submitMessage(req, res) {
  try {
    const { student_id, subject, issue_description, priority } = req.body;
    console.log(student_id, subject, issue_description, priority);
    if (!student_id || !subject || !issue_description) {
      return res.status(400).json({ error: "studentId, subject, and message are required" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("student_id", sql.Int, student_id)
      .input("subject", sql.NVarChar, subject)
      .input("issue_description", sql.NVarChar, issue_description)
      .input("priority", sql.NVarChar, priority || "Low")
      .input("submission_date", sql.DateTime, new Date())
      .input("status", sql.NVarChar, "Pending")
      .query(`
        INSERT INTO SubmittedForms (student_id, subject, issue_description, submission_date, status, priority, admin_id)
        OUTPUT INSERTED.*
        VALUES ((SELECT student_id FROM Student WHERE user_id=@student_id), @subject, @issue_description, @submission_date, @status, @priority, (SELECT assigned_by FROM Student WHERE user_id=@student_id))
      `);

    return res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("submitMessage:", err);
    return res.status(500).json({ error: "Failed to submit message" });
  }
}

//    GET /api/v1/messages
//    Admin lists messages

export async function listMessages(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request()
      .query(`
        SELECT 
          f.form_id,
          f.student_id,
          s.first_name AS student_first_name,
          s.last_name AS student_last_name,
          s.email AS student_email,
          f.admin_id,
          a.first_name AS admin_first_name,
          a.last_name AS admin_last_name,
          f.subject,
          f.issue_description,
          f.priority,
          f.submission_date,
          f.status,
          f.admin_response,
          f.response_date
        FROM SubmittedForms f
        LEFT JOIN Student s ON s.student_id = f.student_id
        LEFT JOIN Admin a ON a.admin_id = f.admin_id
        ORDER BY f.submission_date DESC
      `);

    return res.json(result.recordset);
  } catch (err) {
    console.error("listMessages:", err);
    return res.status(500).json({ error: "Failed to list messages" });
  }
}

//    PATCH /api/v1/messages/:id
//    Admin responds to a message

export async function respondMessage(req, res) {
  try {
    const id = Number(req.params.id);
    const { adminId, response, status } = req.body;

    if (!adminId || !response || !status) {
      return res.status(400).json({ error: "adminId, response, and status are required" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("admin_id", sql.Int, adminId)
      .input("admin_response", sql.NVarChar, response)
      .input("response_date", sql.DateTime, new Date())
      .input("status", sql.NVarChar, status)
      .query(`
        UPDATE SubmittedForms
        SET admin_id=@admin_id, admin_response=@admin_response, response_date=@response_date, status=@status
        WHERE form_id=@id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!result.recordset[0]?.affected) {
      return res.status(404).json({ error: "Message not found" });
    }

    return res.json({ message: "Response submitted successfully" });
  } catch (err) {
    console.error("respondMessage:", err);
    return res.status(500).json({ error: "Failed to respond to message" });
  }
}
