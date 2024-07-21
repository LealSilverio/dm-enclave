import Router from "express";
import { createCampaign } from "../controllers/campaign";

const router = Router();

router.post("/", createCampaign);

export default router;
