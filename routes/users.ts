import { Router } from "express";

import { getToken, registerUser, getUserById } from "../controllers/user";

const router = Router();

router.get("/:userId", getUserById);
router.post("/register", registerUser);
router.post("/login", getToken);

export default router;
