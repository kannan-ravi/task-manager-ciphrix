import { Router } from "express";
import { verifyAuth } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/taskController.js";
const router = Router();

router.get("/", verifyAuth, getTask);
router.post("/", verifyAuth, createTask);
router.put("/:id", verifyAuth, updateTask);
router.delete("/:id", verifyAuth, deleteTask);

export default router;
