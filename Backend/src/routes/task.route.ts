import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/task.controller";
import { verifyUser } from "../middlewares/auth";

const router = Router();

router.use(verifyUser);

router.post("/", addTask);
router.get("/", getTasks);
router.patch("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

export default router;
