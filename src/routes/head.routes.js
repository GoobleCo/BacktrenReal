import { Router } from "express";
import * as headController from "../controllers/head.controllers.js";

const router = Router();

// GET /heads
router.get("/", headController.getAll);

// GET /heads/:id
router.get("/:id", headController.getById);

// POST /heads
router.post("/", headController.create);

// PUT /heads/:id
router.put("/:id", headController.update);

// DELETE /heads/:id
router.delete("/:id", headController.remove);

export default router;
