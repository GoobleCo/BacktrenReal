import { Router } from "express";

const router = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check del backend
 *     description: Devuelve el estado actual del servicio y un timestamp.
 *     responses:
 *       200:
 *         description: Servicio operativo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2026-07-01T00:00:00.000Z
 */
router.get("/", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default router;
