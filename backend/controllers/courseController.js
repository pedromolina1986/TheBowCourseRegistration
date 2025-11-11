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

// GET /api/v1/courses   (?q=&term=&program= supported)
export async function getCourses(req, res) {
  try {
    const { q = "", term, program } = req.query || {};
    const pool = await getPool();

    let query = `SELECT * FROM Courses WHERE 1=1`;
    const r = pool.request();

    if (q) {
      query += ` AND (LOWER(code) LIKE LOWER(@q) OR LOWER(name) LIKE LOWER(@q))`;
      r.input("q", sql.NVarChar, `%${q}%`);
    }
    if (term) {
      query += ` AND term = @term`;
      r.input("term", sql.NVarChar, term);
    }
    if (program) {
      query += ` AND program = @program`;
      r.input("program", sql.NVarChar, program);
    }
    query += ` ORDER BY id DESC`;

    const result = await r.query(query);
    return res.json(result.recordset);
  } catch (err) {
    console.error("getCourses:", err);
    return res.status(500).json({ error: "Failed to retrieve courses" });
  }
}

/* =========================
   READ ONE
   ========================= */

// GET /api/v1/courses/:id
export async function getCourseById(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Courses WHERE id = @id`);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "Course not found" });
    return res.json(row);
  } catch (err) {
    console.error("getCourseById:", err);
    return res.status(500).json({ error: "Failed to retrieve course" });
  }
}

/* =========================
   CREATE
   ========================= */

// POST /api/v1/courses
export async function createCourse(req, res) {
  try {
    const { code, name, term, program, startDate, endDate, description } = req.body || {};
    if (!code || !name || !term) {
      return res.status(400).json({ error: "code, name, term are required" });
    }

    const pool = await getPool();
    const insert = await pool.request()
      .input("code", sql.NVarChar, code)
      .input("name", sql.NVarChar, name)
      .input("term", sql.NVarChar, term)
      .input("program", sql.NVarChar, program ?? null)
      .input("startDate", sql.Date, startDate ?? null)
      .input("endDate", sql.Date, endDate ?? null)
      .input("description", sql.NVarChar, description ?? null)
      .query(`
        INSERT INTO Courses (code, name, term, program, startDate, endDate, description)
        OUTPUT INSERTED.*
        VALUES (@code, @name, @term, @program, @startDate, @endDate, @description)
      `);

    return res.status(201).json(insert.recordset[0]);
  } catch (err) {
    console.error("createCourse:", err);
    return res.status(500).json({ error: "Failed to create course" });
  }
}

/* =========================
   UPDATE (PUT)
   ========================= */

// PUT /api/v1/courses/:id
export async function updateCourse(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const { code, name, term, program, startDate, endDate, description } = req.body || {};
    if (!code || !name || !term) {
      return res.status(400).json({ error: "code, name, term required for PUT" });
    }

    const pool = await getPool();
    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("code", sql.NVarChar, code)
      .input("name", sql.NVarChar, name)
      .input("term", sql.NVarChar, term)
      .input("program", sql.NVarChar, program ?? null)
      .input("startDate", sql.Date, startDate ?? null)
      .input("endDate", sql.Date, endDate ?? null)
      .input("description", sql.NVarChar, description ?? null)
      .query(`
        UPDATE Courses SET
          code = @code,
          name = @name,
          term = @term,
          program = @program,
          startDate = @startDate,
          endDate = @endDate,
          description = @description
        WHERE id = @id;

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected) return res.status(404).json({ error: "Course not found" });
    return res.json({ message: "Course updated" });
  } catch (err) {
    console.error("updateCourse:", err);
    return res.status(500).json({ error: "Failed to update course" });
  }
}

/* =========================
   DELETE
   ========================= */

// DELETE /api/v1/courses/:id
export async function deleteCourse(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const del = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Courses WHERE id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!del.recordset[0]?.affected) return res.status(404).json({ error: "Course not found" });
    return res.json({ message: "Course deleted" });
  } catch (err) {
    console.error("deleteCourse:", err);
    return res.status(500).json({ error: "Failed to delete course" });
  }
}

/* =========================
   SEARCH
   ========================= */

// GET /api/v1/courses/search/:keyword
export async function searchCourses(req, res) {
  try {
    const { keyword } = req.params;
    const pool = await getPool();
    const result = await pool.request()
      .input("kw", sql.NVarChar, `%${keyword}%`)
      .query(`
        SELECT * FROM Courses
        WHERE LOWER(code) LIKE LOWER(@kw) OR LOWER(name) LIKE LOWER(@kw)
        ORDER BY code
      `);
    return res.json(result.recordset);
  } catch (err) {
    console.error("searchCourses:", err);
    return res.status(500).json({ error: "Search failed" });
  }
}

/* =========================
   (OPTIONAL) registerForCourse
   Your courseRoutes.js currently imports this; your real logic lives
   in registrationController via /api/v1/registrations. We'll expose a
   stub here so imports resolve, but guide callers to the proper route.
   ========================= */

// POST /api/v1/courses/register  (stub – advise using /registrations)
export async function registerForCourse(req, res) {
  return res.status(400).json({
    error: "Use POST /api/v1/registrations instead of /courses/register",
  });
}
