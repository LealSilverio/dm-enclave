import { Router } from "express";
import api from "./docs.js";

const router = Router();

router.get("/", (req, res) => {
  res.send(`<h1>DM's Enclave!</h1>`);
});
router.use("/api-docs", api);

export default router;
