import { pool } from "../database.js";

export const getAllHeads = async () => {
	const result = await pool.query("SELECT * FROM heads ORDER BY id");
	return result.rows;
};

export const getHeadById = async (id) => {
	const result = await pool.query("SELECT * FROM heads WHERE id = $1", [id]);
	return result.rows[0];
};

export const createHead = async ({ name, description }) => {
	const result = await pool.query(
		"INSERT INTO heads (name, description, created_at) VALUES ($1, $2, NOW()) RETURNING *",
		[name, description]
	);
	return result.rows[0];
};

export const updateHead = async (id, { name, description }) => {
	const result = await pool.query(
		"UPDATE heads SET name = $1, description = $2 WHERE id = $3 RETURNING *",
		[name, description, id]
	);
	return result.rows[0];
};

export const deleteHead = async (id) => {
	await pool.query("DELETE FROM heads WHERE id = $1", [id]);
	return;
};
