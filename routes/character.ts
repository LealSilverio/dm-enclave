import { Router } from "express";
import {
  createCharacter,
  getAll,
  getSingle,
  searchSingle,
  updateCharacter,
  deleteCharacter,
} from "../controllers/character";
const router = Router();

router.get("/all", getAll);
router.get("/search", searchSingle);
router.get("/:id", getSingle);
router.put("/:id", updateCharacter);
router.post("/", createCharacter);
router.delete("/:id", deleteCharacter);

export default router;
