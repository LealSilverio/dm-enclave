// import { ObjectId } from "mongodb";
// import UserModel from "../models/user";
// import { Request, Response } from "express";
// import performSave from "../db/save";
// import { sendFailRes } from "./utils";
// import { Document } from "mongoose";

// const getAll = async (req: Request, res: Response) => {
//   // const newUser = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const user = new UserModel(newUser);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(user, success, fail);
// };

// const getSingle = async (req: Request, res: Response) => {
//   // const newUser = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const user = new UserModel(newUser);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(user, success, fail);
// };

// const createUser = async (req: Request, res: Response) => {
//   const newUser = {
//     ...req.body,
//     ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   };
//   const user = new UserModel(newUser);
//   const success = (record: Document) => res.status(200).json(record);
//   const fail = (e: Error) => sendFailRes(res, e);
//   await performSave(user, success, fail);
// };

// const updateUser = async (req: Request, res: Response) => {
//   // const newUser = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const user = new UserModel(newUser);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(user, success, fail);
// };

// const deleteUser = async (req: Request, res: Response) => {
//   // const newUser = {
//   //   ...req.body,
//   //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
//   // };
//   // const user = new UserModel(newUser);
//   // const success = (record: Document) => res.status(200).json(record);
//   // const fail = (e: Error) => sendFailRes(res, e);
//   // await performSave(user, success, fail);
// };

// export { getAll, getSingle, createUser, updateUser, deleteUser };
