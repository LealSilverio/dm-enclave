import { Router, Request, Response } from "express";
import apiRouter from "./docs";
import characterRouter from "./character";

const router = Router();

const welcomeMsg = (req: Request, res: Response) => {
  res.send(`<h1>DM's Enclave!</h1>`);
};

router.get("/", welcomeMsg);
router.use("/api-docs", apiRouter);
router.use("/character", characterRouter);

export default router;
