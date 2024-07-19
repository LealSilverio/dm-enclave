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
router.get("/search?charClass=Fighter", searchSingle);
router.post("/", createCharacter);
router.put("/:id", updateCharacter);
router.delete("/:id", deleteCharacter);

export default router;
