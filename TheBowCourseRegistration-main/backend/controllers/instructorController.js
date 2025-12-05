/*
Department CRUD + secure SQL Server queries
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

// GET /api/v1/instructors?q=&
export async function getInstructors(req, res) {
  try {
    const { q = "" } = req.query || {};
    const pool = await getPool();

    let query = `
      SELECT 
        *
      FROM Instructor t
      WHERE 1=1
    `;

    const r = pool.request();

    if (q) {
      query += ` AND (LOWER(t.first_name) LIKE LOWER(@q) OR LOWER(t.last_name) LIKE LOWER(@q))`;
      r.input("q", sql.NVarChar, `%${q}%`);
    }

    query += ` ORDER BY t.first_name, t.last_name DESC`;

    const result = await r.query(query);
    return res.json(result.recordset);

  } catch (err) {
    console.error("getInstructors:", err);
    return res.status(500).json({ error: "Failed to retrieve Instructors" });
  }
}

/* =========================
   READ ONE
   ========================= */

// GET /api/v1/Instructors/:id
export async function getInstructorById(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Instructor WHERE instructor_id = @id`);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "Instructor not found" });

    return res.json(row);

  } catch (err) {
    console.error("getInstructorById:", err);
    return res.status(500).json({ error: "Failed to retrieve Instructor" });
  }
}

/* =========================
   CREATE
   ========================= */

// POST /api/v1/Instructor
export async function createInstructor(req, res) {
  try {
    const {
      first_name,
      last_name,
      email,
      department_id
    } = req.body || {};

    if (!first_name || !last_name || !email || !department_id) {
      return res.status(400).json({
        error: "first_name, last_name, email, department_id are required"
      });
    }

    const pool = await getPool();

    const insert = await pool.request()
      .input("first_name", sql.NVarChar, first_name)
      .input("last_name", sql.NVarChar, last_name)
      .input("email", sql.NVarChar, email)
      .input("department_id", sql.Int, department_id)
      .query(`
        INSERT INTO Instructor (
          first_name, last_name, email, department_id
        )
        OUTPUT INSERTED.*
        VALUES (
          @first_name, @last_name, @email, @department_id
        )
      `);

    return res.status(201).json(insert.recordset[0]);

  } catch (err) {
    console.error("createInstructor:", err);
    return res.status(500).json({ error: "Failed to create Instructor" });
  }
}

/* =========================
   UPDATE
   ========================= */

// PUT /api/v1/Instructors/:id
export async function updateInstructor(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const {
      first_name,
      last_name,
      email,
      department_id
    } = req.body || {};
    if (!first_name || !last_name || !email || !department_id) {
      return res.status(400).json({
        error: "first_name, last_name, email, department_id are required"
      });
    }

    const pool = await getPool();

    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("first_name", sql.NVarChar, first_name)
      .input("last_name", sql.NVarChar, last_name)
      .input("email", sql.NVarChar, email)
      .input("department_id", sql.Int, department_id)
      .query(`
        UPDATE Instructor SET
          first_name = @first_name,
          last_name = @last_name,
          email = @email,
          department_id = @department_id
        WHERE instructor_id = @id;           

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected)
      return res.status(404).json({ error: "Instructor not found" });

    return res.json({ message: "Instructor updated" });

  } catch (err) {
    console.error("updateInstructor:", err);
    return res.status(500).json({ error: "Failed to update Instructor" });
  }
}

/* =========================
   DELETE
   ========================= */

export async function deleteInstructor(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();

    const del = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Instructor WHERE instructor_id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!del.recordset[0]?.affected)
      return res.status(404).json({ error: "Instructor not found" });

    return res.json({ message: "Instructor deleted" });

  } catch (err) {
    console.error("deleteInstructor:", err);
    return res.status(500).json({ error: "Failed to delete Instructor" });
  }
}

/* =========================
   SEARCH
   ========================= */

export async function searchInstructors(req, res) {
  try {
    const { keyword } = req.params;

    const pool = await getPool();
    const result = await pool.request()
      .input("kw", sql.NVarChar, `%${keyword}%`)
      .query(`
        SELECT * FROM Instructor
        WHERE LOWER(first_name) LIKE LOWER(@kw) OR LOWER(last_name) LIKE LOWER(@kw)
        ORDER BY first_name, last_name
      `);

    return res.json(result.recordset);

  } catch (err) {
    console.error("searchInstructor:", err);
    return res.status(500).json({ error: "Search Instructor failed" });
  }
}
