import { ObjectId } from "mongodb";
import EncounterModel from "../models/encounter";
import { Request, Response } from "express";
import performEncSave from "../db/saveEnc";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const getAll = async (req: Request, res: Response) => {
  // const newEnc = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const encounter = new EncounterModel(newEnc);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performEncSave(encounter, success, fail);
};

const getSingle = async (req: Request, res: Response) => {
  // const newEnc = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const encounter = new EncounterModel(newEnc);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performEncSave(encounter, success, fail);
};

const createEncounter = async (req: Request, res: Response) => {
  const newEnc = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const encounter = new EncounterModel(newEnc);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performEncSave(encounter, success, fail);
};

const updateEncounter = async (req: Request, res: Response) => {
  // const newEnc = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const encounter = new EncounterModel(newEnc);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performEncSave(encounter, success, fail);
};

const deleteEncounter = async (req: Request, res: Response) => {
  // const newEnc = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const encounter = new EncounterModel(newEnc);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performEncSave(encounter, success, fail);
};

export { getAll, getSingle, createEncounter, updateEncounter, deleteEncounter };
