import { ObjectId } from "mongodb";
import UserModel from "../models/user";
import { Request, Response } from "express";
import performUserSave from "../db/saveUser";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const createUser = async (req: Request, res: Response) => {
  const newUser = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const user = new UserModel(newUser);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performUserSave(user, success, fail);
};

export { createUser };
