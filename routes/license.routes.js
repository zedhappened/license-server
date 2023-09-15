import { Router } from "express";
import { createLicense, validate } from "../controllers/license.controller.js";

const router = Router();

router.get("/createLicense", createLicense);

router.post("/validate", validate);

export default router;
