import { Router, Request, Response } from "express";
import { getAll, getSingle, searchSingle, createCharacter, updateCharacter, deleteCharacter } from "../controllers/character";
const router = Router();

const get1Character = (req: Request, res: Response) => {
  res.status(200).send({
    name: "Gandalf the Grey",
    class: "Wizard",
    armorClass: 10,
    type: "player",
  });
};
router.get("/1", get1Character);
// router.post("/", createCharacter);

router.get("/", getAll);
router.get("/", getSingle);
router.get("/search", searchSingle);
router.post("/{characterId}", createCharacter);
router.put("/{characterId}", updateCharacter);
router.delete("/{characterId}", deleteCharacter);

export default router;
