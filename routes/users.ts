import { Router } from "express";

import { getToken, registerUser } from "../controllers/user";

const router = Router();

router.post("/register", registerUser);
router.post("/login", getToken);

export default router;
