import { Router } from "express";
import * as userController from "../controllers/users.controllers.js";

const router = Router();

// GET /users
router.get("/", userController.getAll);

// GET /users/:id
router.get("/:id", userController.getById);

// POST /users
router.post("/", userController.create);

// PUT /users/:id
router.put("/:id", userController.update);

// DELETE /users/:id
router.delete("/:id", userController.remove);

export default router;
