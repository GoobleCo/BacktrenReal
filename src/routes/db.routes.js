import { Router } from "express";
import { pool } from "../database.js";

const router = Router();

/**
 * @openapi
 * /db:
 *   get:
 *     tags: [Database]
 *     summary: Verificar conexión a la base de datos
 *     responses:
 *       200:
 *         description: Estado de la conexión a la base de datos
 */
router.get("/", async (req, res) => {
  try {
    const nowResult = await pool.query("SELECT NOW() AS now");
    let headsCount = null;
    try {
      const countResult = await pool.query("SELECT COUNT(*)::int AS count FROM heads");
      headsCount = countResult.rows[0].count;
    } catch (e) {
      // table may not exist yet; that's fine
      headsCount = null;
    }
    res.json({ ok: true, now: nowResult.rows[0].now, headsCount });
  } catch (error) {
    let msg = error && error.message ? error.message : '';
    if (!msg && error && error.errors && Array.isArray(error.errors)) {
      msg = error.errors.map((e) => e && (e.message || e.code) ? (e.message || e.code) : String(e)).join(' | ');
    }
    if (!msg) msg = String(error);
    res.status(500).json({ ok: false, message: msg });
  }
});

export default router;
