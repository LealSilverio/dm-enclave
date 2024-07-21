import { Router } from "express";

import {
  getToken,
  registerUser,
  getUserById,
  getAllUsers,
  updateUser,
  performLogout,
} from "../controllers/user";
import checkToken from "../auth/checkToken";

const router = Router();

router.get("/all", getAllUsers);
router.get("/logout", performLogout);
router.get("/protected", checkToken, (req, res) => {
  res.send("You are authorized");
});
router.get("/:userId", getUserById);
router.post("/register", registerUser);
router.post("/login", getToken);
router.post("/:userId", updateUser);

export default router;
