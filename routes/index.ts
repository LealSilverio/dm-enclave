import { Router } from "express";
import api from "./docs";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>DM's Enclave!</h1>`);
});
router.use("/api-docs", api);
router.get("/character/1", (req, res) => {
  res.status(200).send({
    name: "Gandalf the Grey",
    class: "Wizard",
    armorClass: 10,
    type: "player",
  });
});

export default router;
