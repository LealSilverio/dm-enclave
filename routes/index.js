import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>DM's Enclave!</h1>`);
});

export default router;
