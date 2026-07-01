import { Router } from "express";
import * as headController from "../controllers/head.controllers.js";

const router = Router();

/**
 * @openapi
 * /heads:
 *   get:
 *     tags: [Heads]
 *     summary: Obtener todos los heads
 *     responses:
 *       200:
 *         description: Lista de heads
 *   post:
 *     tags: [Heads]
 *     summary: Crear un head
 *     responses:
 *       201:
 *         description: Head creado
 */
router.get("/", headController.getAll);
router.post("/", headController.create);

/**
 * @openapi
 * /heads/{id}:
 *   get:
 *     tags: [Heads]
 *     summary: Obtener un head por ID
 *     responses:
 *       200:
 *         description: Head encontrado
 *   put:
 *     tags: [Heads]
 *     summary: Actualizar un head
 *     responses:
 *       200:
 *         description: Head actualizado
 *   delete:
 *     tags: [Heads]
 *     summary: Eliminar un head
 *     responses:
 *       204:
 *         description: Head eliminado
 */
router.get("/:id", headController.getById);
router.put("/:id", headController.update);
router.delete("/:id", headController.remove);

export default router;
