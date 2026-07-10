import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

const router = Router();

router.post("/register", handleRegister);
router.post("/signin", handleLogin);

export default router;
