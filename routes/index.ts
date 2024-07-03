import { Router, Request, Response } from "express";
import api from "./docs";

const router = Router();

const welcomeMsg = (req: Request, res: Response) => {
  res.send(`<h1>DM's Enclave!</h1>`);
};

const get1Character = (req: Request, res: Response) => {
  res.status(200).send({
    name: "Gandalf the Grey",
    class: "Wizard",
    armorClass: 10,
    type: "player",
  });
};

router.get("/", welcomeMsg);
router.use("/api-docs", api);
router.get("/character/1", get1Character);

export default router;
