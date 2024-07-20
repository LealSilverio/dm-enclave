import { Router, Request, Response } from "express";
import apiRouter from "./docs";
import characterRouter from "./character";
import userRouter from "./users";

const router = Router();

const welcomeMsg = (req: Request, res: Response) => {
  res.send(`<h1>DM's Enclave!</h1>`);
};

router.get("/", welcomeMsg);
router.use("/api-docs", apiRouter);
router.use("/character", characterRouter);
router.use("/user", userRouter);

export default router;
