/*
Controller for User CRUD + Auth (SQL Server, parameterized)
Schema: Users(user_id INT PK, user_name, user_password, user_type)
DB: TheBowCourse
*/
import sql from "mssql";
import { config } from "../config/dbConfig.js";

async function getPool() {
  if (sql.connected) return sql;
  return sql.connect(config);
}

/* ========= AUTH ========= */

// POST /api/v1/users/register
export async function registerUser(req, res) {
  try {
    const { user_name, user_password, user_type } = req.body || {};
    if (!user_name || !user_password || !user_type) {
      return res.status(400).json({ error: "user_name, user_password, user_type are required" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, user_password)
      .input("user_type", sql.NVarChar, user_type)
      .query(`
        INSERT INTO Users (user_name, user_password, user_type)
        OUTPUT INSERTED.user_id       AS id,
               INSERTED.user_name     AS user_name,
               INSERTED.user_password AS user_password,
               INSERTED.user_type     AS user_type
        VALUES (@user_name, @user_password, @user_type)
      `);

    return res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("registerUser:", err);
    return res.status(500).json({ error: "Failed to register user" });
  }
}

// POST /api/v1/users/login
export async function loginUser(req, res) {
  try {
    const { user_name, user_password } = req.body || {};
    if (!user_name || !user_password) {
      return res.status(400).json({ error: "user_name and user_password are required" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, user_password)
      .query(`
        SELECT TOP 1
          user_id AS id,
          user_name,
          user_password,
          user_type
        FROM Users
        WHERE user_name = @user_name AND user_password = @user_password
      `);

    const user = result.recordset[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    return res.json({ user });
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
      SELECT user_id AS id, user_name, user_password, user_type
      FROM Users
      ORDER BY user_id DESC
    `);
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
      .query(`
        SELECT user_id AS id, user_name, user_password, user_type
        FROM Users
        WHERE user_id = @id
      `);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "User not found" });
    return res.json(row);
  } catch (err) {
    console.error("getUserById:", err);
    return res.status(500).json({ error: "Failed to retrieve user" });
  }
}

// POST /api/v1/users
export async function createUser(req, res) {
  try {
    const { user_name, user_password, user_type } = req.body || {};
    if (!user_name || !user_password || !user_type) {
      return res.status(400).json({ error: "user_name, user_password, user_type are required" });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, user_password)
      .input("user_type", sql.NVarChar, user_type)
      .query(`
        INSERT INTO Users (user_name, user_password, user_type)
        OUTPUT INSERTED.user_id       AS id,
               INSERTED.user_name     AS user_name,
               INSERTED.user_password AS user_password,
               INSERTED.user_type     AS user_type
        VALUES (@user_name, @user_password, @user_type)
      `);

    return res.status(201).json(result.recordset[0]);
  } catch (err) {
    console.error("createUser:", err);
    return res.status(500).json({ error: "Failed to create user" });
  }
}

// PUT /api/v1/users/:id
export async function updateUser(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const { user_name, user_password, user_type } = req.body || {};
    if (!user_name || !user_password || !user_type) {
      return res.status(400).json({ error: "All fields required for PUT" });
    }

    const pool = await getPool();
    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("user_name", sql.NVarChar, user_name)
      .input("user_password", sql.NVarChar, user_password)
      .input("user_type", sql.NVarChar, user_type)
      .query(`
        UPDATE Users SET
          user_name = @user_name,
          user_password = @user_password,
          user_type = @user_type
        WHERE user_id = @id;

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected) return res.status(404).json({ error: "User not found" });
    return res.json({ message: "User updated" });
  } catch (err) {
    console.error("updateUser:", err);
    return res.status(500).json({ error: "Failed to update user" });
  }
}

// PATCH /api/v1/users/:id
export async function patchUser(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const { user_name, user_password, user_type } = req.body || {};
    const pool = await getPool();

    const cur = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT * FROM Users WHERE user_id = @id`);
    const row = cur.recordset[0];
    if (!row) return res.status(404).json({ error: "User not found" });

    const newName = user_name ?? row.user_name;
    const newPass = user_password ?? row.user_password;
    const newType = user_type ?? row.user_type;

    const upd = await pool.request()
      .input("id", sql.Int, id)
      .input("user_name", sql.NVarChar, newName)
      .input("user_password", sql.NVarChar, newPass)
      .input("user_type", sql.NVarChar, newType)
      .query(`
        UPDATE Users SET
          user_name = @user_name,
          user_password = @user_password,
          user_type = @user_type
        WHERE user_id = @id;

        SELECT @@ROWCOUNT AS affected;
      `);

    if (!upd.recordset[0]?.affected) return res.status(404).json({ error: "User not found" });
    return res.json({ message: "User patched" });
  } catch (err) {
    console.error("patchUser:", err);
    return res.status(500).json({ error: "Failed to patch user" });
  }
}

// DELETE /api/v1/users/:id
export async function deleteUser(req, res) {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

    const pool = await getPool();
    const del = await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Users WHERE user_id = @id;
        SELECT @@ROWCOUNT AS affected;
      `);

    if (!del.recordset[0]?.affected) return res.status(404).json({ error: "User not found" });
    return res.json({ message: "User deleted" });
  } catch (err) {
    console.error("deleteUser:", err);
    return res.status(500).json({ error: "Failed to delete user" });
  }
}
