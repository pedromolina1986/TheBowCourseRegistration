/*
Controller for User CRUD + Auth (SQL Server, parameterized)
Schema:
  Users(user_id INT PK, user_name, user_password, user_type)
  Student(
    student_id INT PK,
    user_id INT FK,
    first_name NVARCHAR,
    last_name NVARCHAR,
    email NVARCHAR,
    program NVARCHAR,
    year_level INT NULL,
    assigned_by INT NULL,
    phone NVARCHAR(50) NULL,
    street NVARCHAR(255) NULL,
    city NVARCHAR(100) NULL,
    province NVARCHAR(100) NULL,
    postal_code NVARCHAR(20) NULL,
    start_date DATE NULL
  )
DB: TheBowCourse
*/

import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/dbConfig.js";

// Create a connection pool
async function getPool() {
  if (sql.connected) return sql;
  return sql.connect(config);
}

/* ========= AUTH + REGISTRATION ========= */

// POST /api/v1/users/register
export async function registerUser(req, res) {
  const {
    user_name,
    user_password,
    user_type,
    first_name,
    last_name,
    email,
    phone_number, // admin
    department_id, // admin
    program, // student
    year_level, // student
    assigned_by, // student
  } = req.body;

  if (!user_name || !user_password || !user_type) {
    return res
      .status(400)
      .json({ error: "user_name, user_password, user_type are required" });
  }

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    // Check username uniqueness
    const existingUser = await pool
      .request()
      .input("user_name", sql.NVarChar, user_name)
      .query("SELECT user_id FROM Users WHERE user_name = @user_name");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Validate required fields
    if (
      user_type.toLowerCase() === "student" &&
      (!first_name || !last_name || !email || !assigned_by)
    ) {
      return res.status(400).json({
        error:
          "first_name, last_name, email, assigned_by are required for students",
      });
    }

    if (
      user_type.toLowerCase() === "admin" &&
      (!first_name || !last_name || !email || !department_id)
    ) {
      return res.status(400).json({
        error:
          "first_name, last_name, email, department_id are required for admins",
      });
    }

    await transaction.begin();
    const request = new sql.Request(transaction);

    // Insert into Users
    const hashedPassword = await bcrypt.hash(user_password, 10);
    const userResult = await request
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, hashedPassword)
      .input("user_type", sql.NVarChar, user_type)
      .query(`
        INSERT INTO Users (user_name, user_password, user_type)
        OUTPUT INSERTED.user_id AS id,
               INSERTED.user_name AS user_name,
               INSERTED.user_type AS user_type
        VALUES (@user_name, @user_password, @user_type)
      `);

    const newUser = userResult.recordset[0];

    let newStudent = null;
    let newAdmin = null;

    if (user_type.toLowerCase() === "student") {
      const studentResult = await request
        .input("user_id", sql.Int, newUser.id)
        .input("first_name", sql.NVarChar, first_name)
        .input("last_name", sql.NVarChar, last_name)
        .input("email", sql.NVarChar, email)
        .input("program", sql.NVarChar, program || null)
        .input("year_level", sql.Int, year_level || null)
        .input("assigned_by", sql.Int, assigned_by)
        .query(`
          INSERT INTO Student (
            user_id, first_name, last_name, email, program, year_level, assigned_by
          )
          OUTPUT INSERTED.student_id AS student_id,
                 INSERTED.user_id AS user_id,
                 INSERTED.first_name,
                 INSERTED.last_name,
                 INSERTED.email,
                 INSERTED.program,
                 INSERTED.year_level,
                 INSERTED.assigned_by
          VALUES (@user_id, @first_name, @last_name, @email, @program, @year_level, @assigned_by)
        `);
      newStudent = studentResult.recordset[0];
    } else if (user_type.toLowerCase() === "admin") {
      const adminResult = await request
        .input("user_id", sql.Int, newUser.id)
        .input("first_name", sql.NVarChar, first_name)
        .input("last_name", sql.NVarChar, last_name)
        .input("email", sql.NVarChar, email)
        .input("phone_number", sql.NVarChar, phone_number || null)
        .input("department_id", sql.Int, department_id)
        .query(`
          INSERT INTO Admin (user_id, first_name, last_name, email, phone_number, department_id)
          OUTPUT INSERTED.admin_id AS admin_id,
                 INSERTED.user_id AS user_id,
                 INSERTED.first_name,
                 INSERTED.last_name,
                 INSERTED.email,
                 INSERTED.phone_number,
                 INSERTED.department_id
          VALUES (@user_id, @first_name, @last_name, @email, @phone_number, @department_id)
        `);
      newAdmin = adminResult.recordset[0];
    }

    await transaction.commit();

    return res.status(201).json({
      user: newUser,
      student: newStudent,
      admin: newAdmin,
    });
  } catch (err) {
    console.error("registerUser:", err);
    try {
      await transaction.rollback();
    } catch {}
    return res.status(500).json({ error: "Failed to register user" });
  }
}

// POST /api/v1/users/login
export async function loginUser(req, res) {
  try {
    const { user_name, user_password } = req.body;
    if (!user_name || !user_password) {
      return res
        .status(400)
        .json({ error: "user_name and user_password are required" });
    }

    const pool = await getPool();
    const result = await pool
      .request()
      .input("user_name", sql.NVarChar, user_name)
      .query(`
        SELECT TOP 1 user_id AS id, user_name, user_password, user_type
        FROM Users
        WHERE user_name = @user_name
      `);

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(
      user_password,
      user.user_password
    );
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        user_name: user.user_name,
        user_type: user.user_type,
      },
    });
  } catch (err) {
    console.error("loginUser:", err);
    return res.status(500).json({ error: "Login failed" });
  }
}

/* ========= CRUD ========= */

// GET /api/v1/users
export async function getUsers(req, res) {
  try {
    const pool = await getPool();

    const result = await pool.request().query(`
      SELECT 
        u.user_id AS id,
        u.user_name,
        u.user_type,
        s.student_id,
        s.first_name AS student_first_name,
        s.last_name AS student_last_name,
        s.email AS student_email,
        s.program,
        s.year_level,
        s.assigned_by,
        s.phone,
        s.street,
        s.city,
        s.province,
        s.postal_code,
        s.start_date,
        a.admin_id,
        a.first_name AS admin_first_name,
        a.last_name AS admin_last_name,
        a.email AS admin_email,
        a.phone_number,
        a.department_id
      FROM Users u
      LEFT JOIN Student s ON u.user_id = s.user_id
      LEFT JOIN Admin a ON u.user_id = a.user_id
      ORDER BY u.user_id DESC
    `);

    const users = result.recordset.map((u) => {
      let details = null;
      if (u.user_type.toLowerCase() === "student") {
        details = {
          student_id: u.student_id,
          first_name: u.student_first_name,
          last_name: u.student_last_name,
          email: u.student_email,
          program: u.program,
          year_level: u.year_level,
          assigned_by: u.assigned_by,
          phone: u.phone,
          street: u.street,
          city: u.city,
          province: u.province,
          postal_code: u.postal_code,
          start_date: u.start_date,
        };
      } else if (u.user_type.toLowerCase() === "admin") {
        details = {
          admin_id: u.admin_id,
          first_name: u.admin_first_name,
          last_name: u.admin_last_name,
          email: u.admin_email,
          phone_number: u.phone_number,
          department_id: u.department_id,
        };
      }

      return {
        id: u.id,
        user_name: u.user_name,
        user_type: u.user_type,
        details,
      };
    });

    return res.json(users);
  } catch (err) {
    console.error("getUsers:", err);
    return res.status(500).json({ error: "Failed to retrieve users" });
  }
}

// GET /api/v1/users/:id
export async function getUserById(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const pool = await getPool();

    const userQuery = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT 
          user_id AS id,
          user_name,
          user_type
        FROM Users
        WHERE user_id = @id
      `);

    const user = userQuery.recordset[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    let details = null;

    if (user.user_type.toLowerCase() === "student") {
      const studentQuery = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
          SELECT 
            student_id,
            user_id,
            first_name,
            last_name,
            email,
            program,
            year_level,
            assigned_by,
            phone,
            street,
            city,
            province,
            postal_code,
            start_date
          FROM Student
          WHERE user_id = @id
        `);
      details = studentQuery.recordset[0] || null;
    }

    if (user.user_type.toLowerCase() === "admin") {
      const adminQuery = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
          SELECT 
            admin_id,
            user_id,
            first_name,
            last_name,
            email,
            phone_number,
            department_id
          FROM Admin
          WHERE user_id = @id
        `);
      details = adminQuery.recordset[0] || null;
    }

    return res.json({
      user,
      details,
    });
  } catch (err) {
    console.error("getUserById:", err);
    return res.status(500).json({ error: "Failed to retrieve user details" });
  }
}

// GET /api/v1/users/me
export async function getLoggedInUserDetails(req, res) {
  const { id, user_type } = req.user;

  try {
    const pool = await getPool();

    const userQuery = await pool
      .request()
      .input("id", sql.Int, id)
      .query(`
        SELECT 
          user_id AS id,
          user_name,
          user_type
        FROM Users
        WHERE user_id = @id
      `);

    const user = userQuery.recordset[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    let details = null;

    if (user_type.toLowerCase() === "student") {
      const studentQuery = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
          SELECT 
            student_id,
            user_id,
            first_name,
            last_name,
            email,
            program,
            year_level,
            assigned_by,
            phone,
            street,
            city,
            province,
            postal_code,
            start_date
          FROM Student
          WHERE user_id = @id
        `);
      details = studentQuery.recordset[0] || null;
    }

    if (user_type.toLowerCase() === "admin") {
      const adminQuery = await pool
        .request()
        .input("id", sql.Int, id)
        .query(`
          SELECT 
            a.admin_id,
            a.user_id,
            a.first_name,
            a.last_name,
            a.email,
            a.phone_number,
            a.department_id,
            ap.position AS role,
            ap.updated_at AS profile_updated,
            ad.last_login
          FROM Admin a
          LEFT JOIN AdminProfile ap ON a.admin_id = ap.admin_id
          LEFT JOIN AdminDashboard ad ON a.admin_id = ad.admin_id
          WHERE a.user_id = @id
        `);
      details = adminQuery.recordset[0] || null;
    }

    return res.json({ user, details });
  } catch (err) {
    console.error("getLoggedInUserDetails:", err);
    return res
      .status(500)
      .json({ error: "Failed to retrieve user details" });
  }
}

// PATCH /api/v1/users/me
export async function patchLoggedInUser(req, res) {
  const { id, user_type } = req.user;
  const body = req.body;

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  // Helpers to merge values safely
  const mergeText = (bodyObj, row, field) => {
    if (bodyObj[field] === undefined) return row[field] ?? null;
    if (bodyObj[field] === "") return null;
    return bodyObj[field];
  };

  const mergeInt = (bodyObj, row, field) => {
    if (bodyObj[field] === undefined) return row[field] ?? null;
    if (bodyObj[field] === "" || bodyObj[field] === null) return null;
    const n = Number(bodyObj[field]);
    if (Number.isNaN(n)) return row[field] ?? null;
    return n;
  };

  const mergeDate = (bodyObj, row, field) => {
    if (bodyObj[field] === undefined) return row[field] ?? null;
    if (bodyObj[field] === "" || bodyObj[field] === null) return null;
    // Coming from frontend as "YYYY-MM-DD"
    return bodyObj[field];
  };

  try {
    await transaction.begin();

    // ---------- USERS TABLE ----------
    const userReq = new sql.Request(transaction);
    const userResult = await userReq
      .input("id", sql.Int, id)
      .query("SELECT * FROM Users WHERE user_id=@id");

    const user = userResult.recordset[0];
    if (!user) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    const newUserName =
      body.user_name !== undefined ? body.user_name : user.user_name;

    let newPassword = user.user_password;
    if (body.user_password && body.user_password.trim() !== "") {
      newPassword = await bcrypt.hash(body.user_password, 10);
    }

    await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .input("user_name", sql.NVarChar, newUserName)
      .input("user_password", sql.NVarChar, newPassword)
      .query(`
        UPDATE Users
        SET user_name=@user_name,
            user_password=@user_password
        WHERE user_id=@id
      `);

    // ---------- ADMIN PROFILE ----------
    if (user_type.toLowerCase() === "admin") {
      const adminSelectReq = new sql.Request(transaction);
      const adminCurrent = await adminSelectReq
        .input("id", sql.Int, id)
        .query("SELECT * FROM Admin WHERE user_id=@id");

      const adminRow = adminCurrent.recordset[0] || {};

      const adminUpdate = {
        first_name: mergeText(body, adminRow, "first_name"),
        last_name: mergeText(body, adminRow, "last_name"),
        email: mergeText(body, adminRow, "email"),
        phone_number: mergeText(body, adminRow, "phone_number"),
        department_id: mergeInt(body, adminRow, "department_id"),
      };

      const adminUpdateReq = new sql.Request(transaction);
      await adminUpdateReq
        .input("id", sql.Int, id)
        .input("first_name", sql.NVarChar, adminUpdate.first_name)
        .input("last_name", sql.NVarChar, adminUpdate.last_name)
        .input("email", sql.NVarChar, adminUpdate.email)
        .input("phone_number", sql.NVarChar, adminUpdate.phone_number)
        .input("department_id", sql.Int, adminUpdate.department_id)
        .query(`
          UPDATE Admin
          SET first_name=@first_name,
              last_name=@last_name,
              email=@email,
              phone_number=@phone_number,
              department_id=@department_id
          WHERE user_id=@id
        `);
    }

    // ---------- STUDENT PROFILE ----------
    if (user_type.toLowerCase() === "student") {
      const studentSelectReq = new sql.Request(transaction);
      const studentCurrent = await studentSelectReq
        .input("id", sql.Int, id)
        .query("SELECT * FROM Student WHERE user_id=@id");

      const studentRow = studentCurrent.recordset[0] || {};

      const studentUpdate = {
        first_name: mergeText(body, studentRow, "first_name"),
        last_name: mergeText(body, studentRow, "last_name"),
        email: mergeText(body, studentRow, "email"),
        program: mergeText(body, studentRow, "program"),
        year_level: mergeInt(body, studentRow, "year_level"),
        assigned_by: mergeInt(body, studentRow, "assigned_by"),
        phone: mergeText(body, studentRow, "phone"),
        street: mergeText(body, studentRow, "street"),
        city: mergeText(body, studentRow, "city"),
        province: mergeText(body, studentRow, "province"),
        postal_code: mergeText(body, studentRow, "postal_code"),
        start_date: mergeDate(body, studentRow, "start_date"),
      };

      const studentUpdateReq = new sql.Request(transaction);
      await studentUpdateReq
        .input("id", sql.Int, id)
        .input("first_name", sql.NVarChar, studentUpdate.first_name)
        .input("last_name", sql.NVarChar, studentUpdate.last_name)
        .input("email", sql.NVarChar, studentUpdate.email)
        .input("program", sql.NVarChar, studentUpdate.program)
        .input("year_level", sql.Int, studentUpdate.year_level)
        .input("assigned_by", sql.Int, studentUpdate.assigned_by)
        .input("phone", sql.NVarChar, studentUpdate.phone)
        .input("street", sql.NVarChar, studentUpdate.street)
        .input("city", sql.NVarChar, studentUpdate.city)
        .input("province", sql.NVarChar, studentUpdate.province)
        .input("postal_code", sql.NVarChar, studentUpdate.postal_code)
        .input("start_date", sql.Date, studentUpdate.start_date)
        .query(`
          UPDATE Student
          SET first_name=@first_name,
              last_name=@last_name,
              email=@email,
              program=@program,
              year_level=@year_level,
              assigned_by=@assigned_by,
              phone=@phone,
              street=@street,
              city=@city,
              province=@province,
              postal_code=@postal_code,
              start_date=@start_date
          WHERE user_id=@id
        `);
    }

    await transaction.commit();
    return res.json({ message: "Profile updated successfully" });
  } catch (err) {
    try {
      await transaction.rollback();
    } catch {}
    console.error("patchLoggedInUser:", err);
    return res
      .status(500)
      .json({ error: "Failed to update profile", detail: err.message });
  }
}


/* ========= Remaining CRUD for admins ========= */

// POST /api/v1/users (admin create)
export async function createUser(req, res) {
  const {
    user_name,
    user_password,
    user_type,
    first_name,
    last_name,
    email,
    phone_number,
    department_id,
    program,
    year_level,
    assigned_by,
  } = req.body;

  if (!user_name || !user_password || !user_type) {
    return res
      .status(400)
      .json({ error: "user_name, user_password, user_type are required" });
  }

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    const exists = await pool
      .request()
      .input("user_name", sql.NVarChar, user_name)
      .query("SELECT user_id FROM Users WHERE user_name=@user_name");

    if (exists.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    await transaction.begin();
    const request = new sql.Request(transaction);

    const hashed = await bcrypt.hash(user_password, 10);
    const insertedUser = await request
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, hashed)
      .input("user_type", sql.NVarChar, user_type)
      .query(`
        INSERT INTO Users (user_name, user_password, user_type)
        OUTPUT INSERTED.user_id AS id,
               INSERTED.user_name,
               INSERTED.user_type
        VALUES (@user_name, @user_password, @user_type)
      `);

    const newUser = insertedUser.recordset[0];

    let detail = null;

    if (user_type.toLowerCase() === "student") {
      const studentInsert = await request
        .input("user_id", newUser.id)
        .input("first_name", first_name)
        .input("last_name", last_name)
        .input("email", email)
        .input("program", program || null)
        .input("year_level", year_level || null)
        .input("assigned_by", assigned_by || null)
        .query(`
          INSERT INTO Student (user_id, first_name, last_name, email, program, year_level, assigned_by)
          OUTPUT INSERTED.*
          VALUES (@user_id, @first_name, @last_name, @email, @program, @year_level, @assigned_by)
        `);

      detail = studentInsert.recordset[0];
    }

    if (user_type.toLowerCase() === "admin") {
      const adminInsert = await request
        .input("user_id", newUser.id)
        .input("first_name", first_name)
        .input("last_name", last_name)
        .input("email", email)
        .input("phone_number", phone_number || null)
        .input("department_id", department_id)
        .query(`
          INSERT INTO Admin (user_id, first_name, last_name, email, phone_number, department_id)
          OUTPUT INSERTED.*
          VALUES (@user_id, @first_name, @last_name, @email, @phone_number, @department_id)
        `);

      detail = adminInsert.recordset[0];
    }

    await transaction.commit();

    return res.status(201).json({
      user: newUser,
      detail,
    });
  } catch (err) {
    console.error("createUser:", err);
    try {
      await transaction.rollback();
    } catch {}
    return res.status(500).json({ error: "Failed to create user" });
  }
}

// PUT /api/v1/users/:id
export async function updateUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ error: "Invalid id" });

  const {
    user_name,
    user_password,
    user_type,
    first_name,
    last_name,
    email,
    phone_number,
    department_id,
    program,
    year_level,
    assigned_by,
  } = req.body;

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();
    const request = new sql.Request(transaction);

    const hashed = user_password ? await bcrypt.hash(user_password, 10) : null;

    await request
      .input("id", sql.Int, id)
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, hashed)
      .input("user_type", sql.NVarChar, user_type)
      .query(`
        UPDATE Users 
        SET user_name=@user_name, user_password=@user_password, user_type=@user_type
        WHERE user_id=@id
      `);

    if (user_type.toLowerCase() === "student") {
      await request
        .input("id", id)
        .input("first_name", first_name)
        .input("last_name", last_name)
        .input("email", email)
        .input("program", program || null)
        .input("year_level", year_level || null)
        .input("assigned_by", assigned_by || null)
        .query(`
          UPDATE Student SET
            first_name=@first_name,
            last_name=@last_name,
            email=@email,
            program=@program,
            year_level=@year_level,
            assigned_by=@assigned_by
          WHERE user_id=@id
        `);
    }

    if (user_type.toLowerCase() === "admin") {
      await request
        .input("id", id)
        .input("first_name", first_name)
        .input("last_name", last_name)
        .input("email", email)
        .input("phone_number", phone_number || null)
        .input("department_id", department_id)
        .query(`
          UPDATE Admin SET
            first_name=@first_name,
            last_name=@last_name,
            email=@email,
            phone_number=@phone_number,
            department_id=@department_id
          WHERE user_id=@id
        `);
    }

    await transaction.commit();
    return res.json({ message: "User updated" });
  } catch (err) {
    console.error("updateUser:", err);
    try {
      await transaction.rollback();
    } catch {}
    return res.status(500).json({ error: "Failed to update user" });
  }
}

// PATCH /api/v1/users/:id
export async function patchUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ error: "Invalid id" });

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();
    const request = new sql.Request(transaction);

    const userResult = await request
      .input("id", id)
      .query(`SELECT * FROM Users WHERE user_id=@id`);

    const user = userResult.recordset[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    const { user_name, user_password, user_type } = req.body;

    const updatedName = user_name ?? user.user_name;
    const updatedPass = user_password
      ? await bcrypt.hash(user_password, 10)
      : user.user_password;
    const updatedType = user_type ?? user.user_type;

    await request
      .input("id", id)
      .input("user_name", updatedName)
      .input("user_password", updatedPass)
      .input("user_type", updatedType)
      .query(`
        UPDATE Users SET 
          user_name=@user_name, 
          user_password=@user_password,
          user_type=@user_type
        WHERE user_id=@id
      `);

    await transaction.commit();
    return res.json({ message: "User patched" });
  } catch (err) {
    console.error("patchUser:", err);
    try {
      await transaction.rollback();
    } catch {}
    return res.status(500).json({ error: "Failed to patch user" });
  }
}

// DELETE /api/v1/users/:id
export async function deleteUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id))
    return res.status(400).json({ error: "Invalid id" });

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    const userCheck = await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("SELECT user_id FROM Users WHERE user_id = @id");

    if (userCheck.recordset.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("DELETE FROM Student WHERE user_id = @id");

    await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("DELETE FROM Admin WHERE user_id = @id");

    const result = await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query(
        "DELETE FROM Users WHERE user_id = @id; SELECT @@ROWCOUNT AS affected;"
      );

    if (!result.recordset[0]?.affected) {
      await transaction.rollback();
      return res
        .status(404)
        .json({ error: "User not found when deleting" });
    }

    await transaction.commit();
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    try {
      await transaction.rollback();
    } catch {}
    console.error("deleteUser error:", err);
    return res.status(500).json({
      error: "Failed to delete user",
      detail: err.message,
    });
  }
}
