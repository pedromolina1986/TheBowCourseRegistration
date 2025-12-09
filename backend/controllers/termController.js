/*
Term CRUD + Student Term Selection (SQL Server, parameterized)
*/

import sql from "mssql";
import { config } from "../config/dbConfig.js";

async function getPool() {
  if (sql.connected) return sql;
  return sql.connect(config);
}

/* =========================
   LIST / FILTER (ADMIN & STUDENT)
   ========================= */

// GET /api/v1/terms?q=
export async function getTerms(req, res) {
  try {
    const { q = "" } = req.query || {};
    const pool = await getPool();

    let query = `
      SELECT 
        term_id,
        term_name,
        start_date,
        end_date,
        status
      FROM Term t
      WHERE 1=1
    `;

    const r = pool.request();

    if (q) {
      query += ` AND (LOWER(t.term_name) LIKE LOWER(@q))`;
      r.input("q", sql.NVarChar, `%${q}%`);
    }

    query += ` ORDER BY t.start_date DESC`;

    const result = await r.query(query);
    return res.json(result.recordset);
  } catch (err) {
    console.error("getTerms:", err);
    return res.status(500).json({ error: "Failed to retrieve terms" });
  }
}

/* =========================
   READ ONE (ADMIN)
   ========================= */

// GET /api/v1/terms/:id
export async function getTermById(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Term WHERE term_id = @id`);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "Term not found" });

    return res.json(row);
  } catch (err) {
    console.error("getTermById:", err);
    return res.status(500).json({ error: "Failed to retrieve term" });
  }
}

/* =========================
   CREATE (ADMIN)
   ========================= */

// POST /api/v1/terms
export async function createTerm(req, res) {
  try {
    const { term_name, start_date, end_date, status } = req.body || {};

    if (!term_name || !start_date || !end_date) {
      return res
        .status(400)
        .json({ error: "term_name, start_date, end_date is required" });
    }

    const pool = await getPool();

    const insert = await pool
      .request()
      .input("term_name", sql.NVarChar, term_name)
      .input("start_date", sql.DateTime, start_date)
      .input("end_date", sql.DateTime, end_date)
      .input("status", sql.NVarChar, status ?? "Upcoming")
      .query(`
        INSERT INTO Term (
          term_name, start_date, end_date, status          
        )
        OUTPUT INSERTED.*
        VALUES (
          @term_name, @start_date, @end_date, @status
        )
      `);

    return res.status(201).json(insert.recordset[0]);
  } catch (err) {
    console.error("createTerm:", err);
    return res.status(500).json({ error: "Failed to create term" });
  }
}

/* =========================
   UPDATE (ADMIN)
   ========================= */

// PUT /api/v1/terms/:id
export async function updateTerm(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const { term_name, start_date, end_date, status } = req.body || {};
    if (!term_name || !start_date || !end_date) {
      return res
        .status(400)
        .json({ error: "term_name, start_date, end_date is required" });
    }

    const pool = await getPool();

    const upd = await pool
      .request()
      .input("id", sql.Int, id)
      .input("term_name", sql.NVarChar, term_name)
      .input("start_date", sql.DateTime, start_date)
      .input("end_date", sql.DateTime, end_date)
      .input("status", sql.NVarChar, status ?? "Upcoming")
      .query(`
        UPDATE Term SET
          term_name = @term_name,
          start_date = @start_date,
          end_date   = @end_date,
          status     = @status          
        WHERE term_id = @id;                

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected)
      return res.status(404).json({ error: "Term not found" });

    return res.json({ message: "Term updated" });
  } catch (err) {
    console.error("updateTerm:", err);
    return res.status(500).json({ error: "Failed to update term" });
  }
}

/* =========================
   DELETE (ADMIN)
   ========================= */

export async function deleteTerm(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();

    const del = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Term WHERE term_id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!del.recordset[0]?.affected)
      return res.status(404).json({ error: "Term not found" });

    return res.json({ message: "Term deleted" });
  } catch (err) {
    console.error("deleteTerm:", err);
    return res.status(500).json({ error: "Failed to delete term" });
  }
}

/* =========================
   SEARCH (ADMIN)
   ========================= */

export async function searchTerms(req, res) {
  try {
    const { keyword } = req.params;

    const pool = await getPool();
    const result = await pool
      .request()
      .input("kw", sql.NVarChar, `%${keyword}%`)
      .query(`
        SELECT * FROM Term
        WHERE LOWER(term_name) LIKE LOWER(@kw)
        ORDER BY term_name
      `);

    return res.json(result.recordset);
  } catch (err) {
    console.error("searchTerms:", err);
    return res.status(500).json({ error: "Search term failed" });
  }
}

/* ======================================================
   STUDENT TERM SELECTION (uses TermSelection + Student)
   ====================================================== */

// helper: get student_id from logged-in user_id
async function getStudentIdByUserId(pool, userId) {
  const r = await pool
    .request()
    .input("user_id", sql.Int, userId)
    .query(`
      SELECT student_id
      FROM Student
      WHERE user_id = @user_id
    `);

  return r.recordset[0]?.student_id || null;
}

/**
 * GET /api/v1/students/me/term
 * Returns the student's currently selected term (if any)
 */
export async function getCurrentStudentTerm(req, res) {
  const { id } = req.user; // user_id from JWT

  try {
    const pool = await getPool();
    const studentId = await getStudentIdByUserId(pool, id);

    if (!studentId) {
      return res.status(404).json({ error: "Student record not found" });
    }

    const result = await pool
      .request()
      .input("student_id", sql.Int, studentId)
      .query(`
        SELECT TOP 1
          ts.term_selection_id,
          ts.term_id,
          ts.selection_date,
          t.term_name,
          t.start_date,
          t.end_date,
          t.status
        FROM TermSelection ts
        JOIN Term t ON ts.term_id = t.term_id
        WHERE ts.student_id = @student_id
        ORDER BY ts.selection_date DESC, ts.term_selection_id DESC
      `);

    if (result.recordset.length === 0) {
      // no selection yet
      return res.json({});
    }

    return res.json(result.recordset[0]);
  } catch (err) {
    console.error("getCurrentStudentTerm:", err);
    return res
      .status(500)
      .json({ error: "Failed to load term selection", detail: err.message });
  }
}

/**
 * PATCH /api/v1/students/me/term
 * Body: { term_id }
 * Saves/updates the student's selected term
 */
export async function updateCurrentStudentTerm(req, res) {
  const { id } = req.user; // user_id from JWT
  const { term_id } = req.body;

  if (!term_id) {
    return res.status(400).json({ error: "term_id is required" });
  }

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const studentId = await getStudentIdByUserId(pool, id);
    if (!studentId) {
      await transaction.rollback();
      return res.status(404).json({ error: "Student record not found" });
    }

    // ensure term exists
    const termCheck = await new sql.Request(transaction)
      .input("term_id", sql.Int, term_id)
      .query("SELECT term_id FROM Term WHERE term_id = @term_id");

    if (termCheck.recordset.length === 0) {
      await transaction.rollback();
      return res.status(400).json({ error: "Invalid term_id" });
    }

    // delete old selections for this student (we keep only one active)
    await new sql.Request(transaction)
      .input("student_id", sql.Int, studentId)
      .query(`
        DELETE FROM TermSelection
        WHERE student_id = @student_id
      `);

    // insert new selection
    await new sql.Request(transaction)
      .input("student_id", sql.Int, studentId)
      .input("term_id", sql.Int, term_id)
      .query(`
        INSERT INTO TermSelection (student_id, term_id, selection_date)
        VALUES (@student_id, @term_id, GETDATE())
      `);

    // optional: also store chosen term on Student table
    await new sql.Request(transaction)
      .input("student_id", sql.Int, studentId)
      .input("term_id", sql.Int, term_id)
      .query(`
        UPDATE Student
        SET term_id = @term_id
        WHERE student_id = @student_id
      `);

    await transaction.commit();
    return res.json({ message: "Term selection updated successfully" });
  } catch (err) {
    try {
      await transaction.rollback();
    } catch {}
    console.error("updateCurrentStudentTerm:", err);
    return res.status(500).json({
      error: "Failed to update term selection",
      detail: err.message,
    });
  }
}
