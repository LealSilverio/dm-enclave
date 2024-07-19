import { ObjectId } from "mongodb";
import CharacterModel from "../models/character";
import { Request, Response } from "express";
import performCharSave from "../db/saveChar";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const getAll = async (req: Request, res: Response) => {
  // const newChar = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const character = new CharacterModel(newChar);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performCharSave(character, success, fail);
};

const getSingle = async (req: Request, res: Response) => {
  // const newChar = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const character = new CharacterModel(newChar);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performCharSave(character, success, fail);
};

const createCharacter = async (req: Request, res: Response) => {
  const newChar = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const character = new CharacterModel(newChar);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performCharSave(character, success, fail);
};

const updateCharacter = async (req: Request, res: Response) => {
  // const newChar = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const character = new CharacterModel(newChar);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performCharSave(character, success, fail);
};

const deleteCharacter = async (req: Request, res: Response) => {
  // const newChar = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const character = new CharacterModel(newChar);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performCharSave(character, success, fail);
};

export { getAll, getSingle, createCharacter, updateCharacter, deleteCharacter };
