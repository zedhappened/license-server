import { Router } from "express";
import { getFingerprint } from "../controllers/user.controller.js";

const router = Router();

router.post("/getFingerprint", getFingerprint);

export default router;
