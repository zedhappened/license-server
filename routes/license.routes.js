import { Router } from "express";
import { createLicense, validate, getKeys, unlink } from "../controllers/license.controller.js";

const router = Router();

router.get("/createLicense", createLicense);

router.get("/keys/:id", getKeys);

router.post("/validate", validate);

router.put("/unlink/:id", unlink);

export default router;
