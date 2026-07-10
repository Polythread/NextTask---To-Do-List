import { Router } from "express";
import { addTask, getTasks } from "../controllers/task.controller";

const router = Router();

router.post("/", addTask);
router.get("/", getTasks);

export default router;
