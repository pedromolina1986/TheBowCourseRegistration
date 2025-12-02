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

// GET /api/v1/Terms?q=&term_id=&instructor_id=
export async function getTerms(req, res) {
  try {
    const { q = "" } = req.query || {};
    const pool = await getPool();

    let query = `
      SELECT 
        *
      FROM Term t
      WHERE 1=1
    `;

    const r = pool.request();

    if (q) {
      query += ` AND (LOWER(t.term_name) LIKE LOWER(@q))`;
      r.input("q", sql.NVarChar, `%${q}%`);
    }

    query += ` ORDER BY t.term_name DESC`;

    const result = await r.query(query);
    return res.json(result.recordset);

  } catch (err) {
    console.error("getTerms:", err);
    return res.status(500).json({ error: "Failed to retrieve Terms" });
  }
}

/* =========================
   READ ONE
   ========================= */

// GET /api/v1/Terms/:id
export async function getTermById(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Term WHERE term_id = @id`);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "Term not found" });

    return res.json(row);

  } catch (err) {
    console.error("getTermById:", err);
    return res.status(500).json({ error: "Failed to retrieve Term" });
  }
}

/* =========================
   CREATE
   ========================= */

// POST /api/v1/Term
export async function createTerm(req, res) {
  try {
    const {
      term_name,
      start_date,
      end_date,
      status
    } = req.body || {};

    if (!term_name || !start_date || !end_date) {
      return res.status(400).json({
        error: "term_name, start_date, end_date is required"
      });
    }

    const pool = await getPool();

    const insert = await pool.request()
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
    return res.status(500).json({ error: "Failed to create Term" });
  }
}

/* =========================
   UPDATE
   ========================= */

// PUT /api/v1/Terms/:id
export async function updateTerm(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const {
      term_name,
      start_date,
      end_date,
      status
    } = req.body || {};
    if (!term_name || !start_date || !end_date) {
      return res.status(400).json({
        error: "term_name, start_date, end_date is required"
      });
    }

    const pool = await getPool();

    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("term_name", sql.NVarChar, term_name)
      .input("start_date", sql.DateTime, start_date)
      .input("end_date", sql.DateTime, end_date)
      .input("status", sql.NVarChar, status ?? "Upcoming")      
      .query(`
        UPDATE Term SET
          term_name = @term_name,
          start_date = @start_date,
          end_date = @end_date,
          status = @status          
        WHERE term_id = @id;                

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected)
      return res.status(404).json({ error: "Term not found" });

    return res.json({ message: "Term updated" });

  } catch (err) {
    console.error("updateTerm:", err);
    return res.status(500).json({ error: "Failed to update Term" });
  }
}

/* =========================
   DELETE
   ========================= */

export async function deleteTerm(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();

    const del = await pool.request()
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
    return res.status(500).json({ error: "Failed to delete Term" });
  }
}

/* =========================
   SEARCH
   ========================= */

export async function searchTerms(req, res) {
  try {
    const { keyword } = req.params;

    const pool = await getPool();
    const result = await pool.request()
      .input("kw", sql.NVarChar, `%${keyword}%`)
      .query(`
        SELECT * FROM Term
        WHERE LOWER(term_name) LIKE LOWER(@kw)
        ORDER BY term_name
      `);

    return res.json(result.recordset);

  } catch (err) {
    console.error("searchTerms:", err);
    return res.status(500).json({ error: "Search Term failed" });
  }
}
