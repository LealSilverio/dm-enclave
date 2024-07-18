import { ObjectId } from "mongodb";
import CampaignModel from "../models/campaign";
import { Request, Response } from "express";
import performCampSave from "../db/saveCamp";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const createCampaign = async (req: Request, res: Response) => {
  const newCamp = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const campaign = new CampaignModel(newCamp);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performCampSave(campaign, success, fail);
};

export { createCampaign };
