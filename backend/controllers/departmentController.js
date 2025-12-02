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

// GET /api/v1/Departments?q=&term_id=&instructor_id=
export async function getDepartments(req, res) {
  try {
    const { q = "" } = req.query || {};
    const pool = await getPool();

    let query = `
      SELECT 
        *
      FROM Department c
      WHERE 1=1
    `;

    const r = pool.request();

    if (q) {
      query += ` AND (LOWER(c.department_name) LIKE LOWER(@q))`;
      r.input("q", sql.NVarChar, `%${q}%`);
    }

    query += ` ORDER BY c.department_name DESC`;

    const result = await r.query(query);
    return res.json(result.recordset);

  } catch (err) {
    console.error("getDepartments:", err);
    return res.status(500).json({ error: "Failed to retrieve Departments" });
  }
}

/* =========================
   READ ONE
   ========================= */

// GET /api/v1/Departments/:id
export async function getDepartmentById(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Department WHERE Department_id = @id`);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "Department not found" });

    return res.json(row);

  } catch (err) {
    console.error("getDepartmentById:", err);
    return res.status(500).json({ error: "Failed to retrieve Department" });
  }
}

/* =========================
   CREATE
   ========================= */

// POST /api/v1/Departments
export async function createDepartment(req, res) {
  try {
    const {
      department_name,
      office_location
    } = req.body || {};

    if (!office_location || !department_name) {
      return res.status(400).json({
        error: "department_name and office_location are required"
      });
    }

    const pool = await getPool();

    const insert = await pool.request()
      .input("department_name", sql.NVarChar, department_name)
      .input("office_location", sql.NVarChar, office_location)
      .query(`
        INSERT INTO Department (
          department_name, office_location          
        )
        OUTPUT INSERTED.*
        VALUES (
          @department_name, @office_location          
        )
      `);

    return res.status(201).json(insert.recordset[0]);

  } catch (err) {
    console.error("createDepartment:", err);
    return res.status(500).json({ error: "Failed to create Department" });
  }
}

/* =========================
   UPDATE
   ========================= */

// PUT /api/v1/Departments/:id
export async function updateDepartment(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const {
      department_name,
      office_location
    } = req.body || {};

    if (!department_name || !office_location) {
      return res.status(400).json({
        error: "department_name and office_location are required"
      });
    }

    const pool = await getPool();

    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("department_name", sql.NVarChar, department_name)
      .input("office_location", sql.NVarChar, office_location)
      .query(`
        UPDATE Department SET
          department_name = @department_name,
          office_location = @office_location
        WHERE department_id = @id;

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected)
      return res.status(404).json({ error: "Department not found" });

    return res.json({ message: "Department updated" });

  } catch (err) {
    console.error("updateDepartment:", err);
    return res.status(500).json({ error: "Failed to update Department" });
  }
}

/* =========================
   DELETE
   ========================= */

export async function deleteDepartment(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();

    const del = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Department WHERE department_id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!del.recordset[0]?.affected)
      return res.status(404).json({ error: "Department not found" });

    return res.json({ message: "Department deleted" });

  } catch (err) {
    console.error("deleteDepartment:", err);
    return res.status(500).json({ error: "Failed to delete Department" });
  }
}

/* =========================
   SEARCH
   ========================= */

export async function searchDepartments(req, res) {
  try {
    const { keyword } = req.params;

    const pool = await getPool();
    const result = await pool.request()
      .input("kw", sql.NVarChar, `%${keyword}%`)
      .query(`
        SELECT * FROM Department
        WHERE LOWER(department_name) LIKE LOWER(@kw)
        ORDER BY department_name
      `);

    return res.json(result.recordset);

  } catch (err) {
    console.error("searchDepartments:", err);
    return res.status(500).json({ error: "Search failed" });
  }
}
