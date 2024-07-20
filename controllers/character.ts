import { ObjectId } from "mongodb";
import CharacterModel from "../models/character";
import { Request, Response } from "express";
import performSave from "../db/save";
import performFind from "../db/find";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const getAll = async (req: Request, res: Response) => {
  await performFind(
    CharacterModel,
    (record) => res.status(200).json(record),
    (e) => sendFailRes(res, e)
  );
};

const getSingle = async (req: Request, res: Response) => {
  const charId = req.params.id;
  try {
    const foundCharacter = await CharacterModel.findById(charId);
    res.status(200).json(foundCharacter);
  } catch (e) {
    sendFailRes(res, e);
  }
};

const searchSingle = async (req: Request, res: Response) => {
  const searchParams = req.query;
  const searchKeys = Object.keys(searchParams);
  const possibleKeys = Object.keys(CharacterModel.schema.obj);
  const valid = searchKeys.every((key) => possibleKeys.includes(key));
  if (!valid) {
    return res.status(400).json({
      error: "Invalid search key(s)",
      validKeys: possibleKeys,
    });
  } else {
    let searchObj = {};
    searchKeys.forEach((key) => {
      if (searchParams[key]) {
        const val = searchParams[key].toString();
        searchObj[key] = { $regex: new RegExp(val, "i") };
      }
    });
    if (Object.keys(searchObj).length === 0) {
      res.status(400).json({ message: "no valid search parameters" });
    } else {
      await performFind(
        CharacterModel,
        (record) => res.status(200).json(record),
        (e) => sendFailRes(res, e),
        searchObj
      );
    }
  }
};

const createCharacter = async (req: Request, res: Response) => {
  let newChar = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const character = new CharacterModel(newChar);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performSave(character, success, fail);
};

const updateCharacter = async (req: Request, res: Response) => {
  const charId = req.params.id;
  let newChar = req.body;
  if (newChar.ownerId) {
    newChar.ownerId = ObjectId.createFromHexString(newChar.ownerId);
  }
  try {
    const updatedChar = await CharacterModel.findByIdAndUpdate(
      charId,
      newChar,
      {
        new: true,
      }
    );
    res.status(200).json(updatedChar);
  } catch (e) {
    sendFailRes(res, e);
  }
};

const deleteCharacter = async (req: Request, res: Response) => {
  const delId = req.params.id;
  try {
    const deletedChar = await CharacterModel.findByIdAndDelete(delId);
    res.status(200).json(deletedChar);
  } catch (e) {
    sendFailRes(res, e);
  }
};

export {
  getAll,
  getSingle,
  searchSingle,
  createCharacter,
  updateCharacter,
  deleteCharacter,
};
