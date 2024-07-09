import { Router, Request, Response } from "express";
import { createCharacter } from "../controllers/character";
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
router.post("/", createCharacter);

export default router;
