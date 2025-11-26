/*
Course CRUD + secure SQL Server queries
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

// GET /api/v1/courses?q=&term_id=&instructor_id=
export async function getCourses(req, res) {
  try {
    const { q = "", term_id, instructor_id } = req.query || {};
    const pool = await getPool();

    let query = `SELECT * FROM Course WHERE 1=1`;
    const r = pool.request();

    if (q) {
      query += ` AND (LOWER(course_code) LIKE LOWER(@q) OR LOWER(course_name) LIKE LOWER(@q))`;
      r.input("q", sql.NVarChar, `%${q}%`);
    }

    if (term_id) {
      query += ` AND term_id = @term_id`;
      r.input("term_id", sql.Int, term_id);
    }

    if (instructor_id) {
      query += ` AND instructor_id = @instructor_id`;
      r.input("instructor_id", sql.Int, instructor_id);
    }

    query += ` ORDER BY course_id DESC`;

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
      .query(`SELECT * FROM Course WHERE course_id = @id`);

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
    const {
      term_id,
      course_code,
      course_name,
      description,
      credit_hours,
      capacity,
      instructor_id,
      modified_by
    } = req.body || {};

    if (!course_code || !course_name) {
      return res.status(400).json({
        error: "course_code and course_name are required"
      });
    }

    const pool = await getPool();

    const insert = await pool.request()
      .input("term_id", sql.Int, term_id ?? null)
      .input("course_code", sql.NVarChar, course_code)
      .input("course_name", sql.NVarChar, course_name)
      .input("description", sql.NVarChar, description ?? null)
      .input("credit_hours", sql.Int, credit_hours ?? null)
      .input("capacity", sql.Int, capacity ?? null)
      .input("instructor_id", sql.Int, instructor_id ?? null)
      .input("modified_by", sql.Int, modified_by ?? null)
      .query(`
        INSERT INTO Course (
          term_id, course_code, course_name, description,
          credit_hours, capacity, instructor_id,
          modified_by, modified_at
        )
        OUTPUT INSERTED.*
        VALUES (
          @term_id, @course_code, @course_name, @description,
          @credit_hours, @capacity, @instructor_id,
          @modified_by, GETDATE()
        )
      `);

    return res.status(201).json(insert.recordset[0]);

  } catch (err) {
    console.error("createCourse:", err);
    return res.status(500).json({ error: "Failed to create course" });
  }
}

/* =========================
   UPDATE
   ========================= */

// PUT /api/v1/courses/:id
export async function updateCourse(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const {
      term_id,
      course_code,
      course_name,
      description,
      credit_hours,
      capacity,
      instructor_id,
      modified_by
    } = req.body || {};

    if (!course_code || !course_name) {
      return res.status(400).json({
        error: "course_code and course_name are required"
      });
    }

    const pool = await getPool();

    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("term_id", sql.Int, term_id ?? null)
      .input("course_code", sql.NVarChar, course_code)
      .input("course_name", sql.NVarChar, course_name)
      .input("description", sql.NVarChar, description ?? null)
      .input("credit_hours", sql.Int, credit_hours ?? null)
      .input("capacity", sql.Int, capacity ?? null)
      .input("instructor_id", sql.Int, instructor_id ?? null)
      .input("modified_by", sql.Int, modified_by ?? null)
      .query(`
        UPDATE Course SET
          term_id = @term_id,
          course_code = @course_code,
          course_name = @course_name,
          description = @description,
          credit_hours = @credit_hours,
          capacity = @capacity,
          instructor_id = @instructor_id,
          modified_by = @modified_by,
          modified_at = GETDATE()
        WHERE course_id = @id;

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected)
      return res.status(404).json({ error: "Course not found" });

    return res.json({ message: "Course updated" });

  } catch (err) {
    console.error("updateCourse:", err);
    return res.status(500).json({ error: "Failed to update course" });
  }
}

/* =========================
   DELETE
   ========================= */

export async function deleteCourse(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();

    const del = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Course WHERE course_id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!del.recordset[0]?.affected)
      return res.status(404).json({ error: "Course not found" });

    return res.json({ message: "Course deleted" });

  } catch (err) {
    console.error("deleteCourse:", err);
    return res.status(500).json({ error: "Failed to delete course" });
  }
}

/* =========================
   SEARCH
   ========================= */

export async function searchCourses(req, res) {
  try {
    const { keyword } = req.params;

    const pool = await getPool();
    const result = await pool.request()
      .input("kw", sql.NVarChar, `%${keyword}%`)
      .query(`
        SELECT * FROM Course
        WHERE LOWER(course_code) LIKE LOWER(@kw)
           OR LOWER(course_name) LIKE LOWER(@kw)
        ORDER BY course_code
      `);

    return res.json(result.recordset);

  } catch (err) {
    console.error("searchCourses:", err);
    return res.status(500).json({ error: "Search failed" });
  }
}
