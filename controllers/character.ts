import { ObjectId } from "mongodb";
import CharacterModel from "../models/character";
import { Request, Response } from "express";
import performSave from "../db/save";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const createCharacter = async (req: Request, res: Response) => {
  const newChar = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const character = new CharacterModel(newChar);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: any) => sendFailRes(res, e);
  await performSave(character, success, fail);
};

export { createCharacter };
