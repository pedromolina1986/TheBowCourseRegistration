/*
Controller for User CRUD + Auth (SQL Server, parameterized)
Schema: Users(user_id INT PK, user_name, user_password, user_type)
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

/* ========= AUTH ========= */

// POST /api/v1/users/register

/* ========= AUTH + STUDENT REGISTRATION ========= */
export async function registerUser(req, res) {
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
    assigned_by
  } = req.body;

  // Basic validations
  if (!user_name || !user_password || !user_type) {
    return res.status(400).json({ error: "user_name, user_password, user_type are required" });
  }

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    //Check username uniqueness
    const existingUser = await pool.request()
      .input("user_name", sql.NVarChar, user_name)
      .query("SELECT user_id FROM Users WHERE user_name = @user_name");

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    //Validate required fields for student/admin
    if (user_type.toLowerCase() === "student" && (!first_name || !last_name || !email || !assigned_by)) {
      return res.status(400).json({ error: "first_name, last_name, email, assigned_by are required for students" });
    }
    if (user_type.toLowerCase() === "admin" && (!first_name || !last_name || !email || !department_id)) {
      return res.status(400).json({ error: "first_name, last_name, email, department_id are required for admins" });
    }

    await transaction.begin();

    const request = new sql.Request(transaction);

    //Insert into Users
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

    //Insert into Student/Admin depending on user_type
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
          INSERT INTO Student (user_id, first_name, last_name, email, program, year_level, assigned_by)
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

    //Return combined info
    return res.status(201).json({
      user: newUser,
      student: newStudent,
      admin: newAdmin
    });

  } catch (err) {
    console.error("registerUser:", err);
    await transaction.rollback();
    return res.status(500).json({ error: "Failed to register user" });
  }
}


// POST /api/v1/users/login
export async function loginUser(req, res) {
  try {
    const { user_name, user_password } = req.body;
    if (!user_name || !user_password) {
      return res.status(400).json({ error: "user_name and user_password are required" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("user_name", sql.NVarChar, user_name)
      .query(`
        SELECT TOP 1 user_id AS id, user_name, user_password, user_type
        FROM Users
        WHERE user_name = @user_name
      `);

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(user_password, user.user_password);
    if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, user_type: user.user_type },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.json({
      token,
      user: { id: user.id, user_name: user.user_name, user_type: user.user_type }
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
    const result = await pool.request()
      .query("SELECT user_id AS id, user_name, user_type FROM Users ORDER BY user_id DESC");
    return res.json(result.recordset);
  } catch (err) {
    console.error("getUsers:", err);
    return res.status(500).json({ error: "Failed to retrieve users" });
  }
}

// GET /api/v1/users/:id
export async function getUserById(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT user_id AS id, user_name, user_type FROM Users WHERE user_id = @id");

    const user = result.recordset[0];
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.json(user);
  } catch (err) {
    console.error("getUserById:", err);
    return res.status(500).json({ error: "Failed to retrieve user" });
  }
}

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
    assigned_by
  } = req.body;

  if (!user_name || !user_password || !user_type) {
    return res.status(400).json({ error: "user_name, user_password, user_type are required" });
  }

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    // Check username uniqueness
    const exists = await pool.request()
      .input("user_name", sql.NVarChar, user_name)
      .query("SELECT user_id FROM Users WHERE user_name=@user_name");

    if (exists.recordset.length > 0) {
      return res.status(400).json({ error: "Username already exists" });
    }

    await transaction.begin();
    const request = new sql.Request(transaction);

    // Insert user
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
      detail
    });

  } catch (err) {
    console.error("createUser:", err);
    await transaction.rollback();
    return res.status(500).json({ error: "Failed to create user" });
  }
}


// PUT /api/v1/users/:id
export async function updateUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

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
    assigned_by
  } = req.body;

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();
    const request = new sql.Request(transaction);

    const hashed = user_password ? await bcrypt.hash(user_password, 10) : null;

    //Update users table
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

    //Update linked record
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
    await transaction.rollback();
    console.error("updateUser:", err);
    return res.status(500).json({ error: "Failed to update user" });
  }
}


// PATCH /api/v1/users/:id
export async function patchUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

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

    const {
      user_name,
      user_password,
      user_type
    } = req.body;

    const updatedName = user_name ?? user.user_name;
    const updatedPass = user_password
      ? await bcrypt.hash(user_password, 10)
      : user.user_password;
    const updatedType = user_type ?? user.user_type;

    //Update Users table
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
    await transaction.rollback();
    console.error("patchUser:", err);
    return res.status(500).json({ error: "Failed to patch user" });
  }
}

//DELETE /api/v1/users/:id
export async function deleteUser(req, res) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

  const pool = await getPool();
  const transaction = new sql.Transaction(pool);

  try {
    await transaction.begin();

    //Check user exists
    const userCheck = await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("SELECT user_id FROM Users WHERE user_id = @id");

    if (userCheck.recordset.length === 0) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found" });
    }

    //Delete child records
    await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("DELETE FROM Student WHERE user_id = @id");

    await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("DELETE FROM Admin WHERE user_id = @id");

    //Delete user
    const result = await new sql.Request(transaction)
      .input("id", sql.Int, id)
      .query("DELETE FROM Users WHERE user_id = @id; SELECT @@ROWCOUNT AS affected;");

    if (!result.recordset[0]?.affected) {
      await transaction.rollback();
      return res.status(404).json({ error: "User not found when deleting" });
    }

    await transaction.commit();
    return res.json({ message: "User deleted successfully" });

  } catch (err) {
    try { await transaction.rollback(); } catch {}
    console.error("deleteUser error:", err);
    return res.status(500).json({ error: "Failed to delete user", detail: err.message });
  }
}


