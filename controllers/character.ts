import { ObjectId } from "mongodb";
import CharacterModel from "../models/character";
import { Request, Response } from "express";
import performSave from "../db/save";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";

const getAll = async (req: Request, res: Response) => {
  try {
    const result = await CharacterModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req: Request, res: Response) => {
  try {
    const result = await CharacterModel.findById(ObjectId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchSingle = async (req: Request, res: Response) => {
  try {
    const searchData = await CharacterModel.find(req.query).exec();
    res.json(searchData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCharacter = async (req: Request, res: Response) => {
  const newChar = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const character = new CharacterModel(newChar);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performSave(character, success, fail);
};

const updateCharacter = async (req: Request, res: Response) => {
  try {
    const updatedData = await CharacterModel.findByIdAndUpdate(req.params.id, req.body, {new: true });
    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCharacter = async (req: Request, res: Response) => {
  try {
    const deletedData = await CharacterModel.findByIdAndDelete(req.params.id);
    if (!deletedData) {
      return res.status(404).json({ message: 'Data not found' });
    }
    res.json({ message: 'Data deleted successfully' });
  } catch (error) { 
    res.status(500).json({ message: error.message });
  }
};

export { getAll, getSingle, searchSingle, createCharacter, updateCharacter, deleteCharacter };
