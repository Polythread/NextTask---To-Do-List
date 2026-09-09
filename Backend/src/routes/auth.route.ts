import { Router } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import { tokenBucketLimiter } from "../middlewares/ratelimit";

const router = Router();

router.post("/register", handleRegister);
router.post("/signin",tokenBucketLimiter, handleLogin);

export default router;
