import { ObjectId } from "mongodb";
import CampaignModel from "../models/campaign";
import { Request, Response } from "express";
import performSave from "../db/save";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

// const getAll = async (req: Request, res: Response) => {
//   // const newCamp = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const campaign = new CampaignModel(newCamp);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(campaign, success, fail);
// };

// const getSingle = async (req: Request, res: Response) => {
//   // const newCamp = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const campaign = new CampaignModel(newCamp);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(campaign, success, fail);
// };

const createCampaign = async (req: Request, res: Response) => {
  console.log("ownerId", req.body.ownerId);
  const newCamp = req.body;
  const campaign = new CampaignModel(newCamp);
  await performSave(
    campaign,
    (record) => res.status(200).json(record),
    (e) => sendFailRes(res, e)
  );
};

// const updateCampaign = async (req: Request, res: Response) => {
//   // const newCamp = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const campaign = new CampaignModel(newCamp);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(campaign, success, fail);
// };

// const deleteCampaign = async (req: Request, res: Response) => {
//   // const newCamp = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const campaign = new CampaignModel(newCamp);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(campaign, success, fail);
// };

export { createCampaign };
