import { Router } from "express";
import { verifyAuth } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getSingleTask,
  getTask,
  updateTask,
} from "../controllers/taskController.js";
const router = Router();

router.get("/", verifyAuth, getTask);
router.post("/", verifyAuth, createTask);
router.put("/:id", verifyAuth, updateTask);
router.get("/:id", verifyAuth, getSingleTask);
router.delete("/:id", verifyAuth, deleteTask);

export default router;
