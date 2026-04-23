import { Router } from "express";
import { setupMFA, verifyMFA } from "../controllers/mfa.controller";

const router = Router();

router.post("/setup", setupMFA);
router.post("/verify", verifyMFA);

export default router;