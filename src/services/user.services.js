import { pool } from "../database.js";

export const getAllUsers = async () => {
  const result = await pool.query("SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users ORDER BY id");
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await pool.query("SELECT id, email, username, first_name, last_name, created_at, updated_at FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

export const createUser = async ({ email, username, password_hash, first_name, last_name }) => {
  const result = await pool.query(
    "INSERT INTO users (email, username, password_hash, first_name, last_name, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING id, email, username, first_name, last_name, created_at, updated_at",
    [email, username, password_hash, first_name, last_name]
  );
  return result.rows[0];
};

export const updateUser = async (id, { email, username, first_name, last_name }) => {
  const result = await pool.query(
    "UPDATE users SET email = COALESCE($1, email), username = COALESCE($2, username), first_name = COALESCE($3, first_name), last_name = COALESCE($4, last_name), updated_at = NOW() WHERE id = $5 RETURNING id, email, username, first_name, last_name, created_at, updated_at",
    [email, username, first_name, last_name, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  return;
};
