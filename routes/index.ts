import { Router, Request, Response } from "express";
import apiRouter from "./docs";
import characterRouter from "./character";
import userRouter from "./users";
import campaignRouter from "./campaign";

const router = Router();

const welcomeMsg = (req: Request, res: Response) => {
  res.send(`<h1>DM's Enclave!</h1>`);
};

router.get("/", welcomeMsg);
router.use("/api-docs", apiRouter);
router.use("/character", characterRouter);
router.use("/user", userRouter);
router.use("/campaign", campaignRouter);

export default router;
