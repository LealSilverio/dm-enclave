
import { ObjectId } from "mongodb";
import UserModel from "../models/user";
import { Request, Response } from "express";
import performSave from "../db/save";
import { sendFailRes } from "./utils";
import { Document } from "mongoose";
import axios, { AxiosRequestConfig } from "axios";

const getAll = async (req: Request, res: Response) => {
  // const newUser = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const user = new UserModel(newUser);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performSave(user, success, fail);
};

const getSingle = async (req: Request, res: Response) => {
  // const newUser = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const user = new UserModel(newUser);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performSave(user, success, fail);
};

const createUser = async (req: Request, res: Response) => {
  const newUser = {
    ...req.body,
    ownerId: ObjectId.createFromHexString(req.body.ownerId),
  };
  const user = new UserModel(newUser);
  const success = (record: Document) => res.status(200).json(record);
  const fail = (e: Error) => sendFailRes(res, e);
  await performSave(user, success, fail);
};

const updateUser = async (req: Request, res: Response) => {
  // const newUser = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const user = new UserModel(newUser);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performSave(user, success, fail);
};

const deleteUser = async (req: Request, res: Response) => {
  // const newUser = {
  //   ...req.body,
  //   ownerId: ObjectId.createFromHexString(req.body.ownerId),
  // };
  // const user = new UserModel(newUser);
  // const success = (record: Document) => res.status(200).json(record);
  // const fail = (e: Error) => sendFailRes(res, e);
  // await performSave(user, success, fail);
};

const registerUser = async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, profilePicUrl, type } =
    req.body;

  const options: AxiosRequestConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `https://${process.env.AUTH0_DOMAIN}/dbconnections/signup`,
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      email,
      password,
      connection: process.env.AUTH0_DB,
      given_name: firstName,
      family_name: lastName,
      picture: profilePicUrl,
      user_metadata: {
        type,
      },
    },
    responseType: "json",
  };

  try {
    console.log(`options`, options);
    const authRes = await axios(options);
    console.log(authRes.status, authRes.data, authRes.headers, authRes.config);
    res.status(200).send(authRes.data);
  } catch (e) {
    console.error(e);
  }
};

const getToken = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const options: AxiosRequestConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    data: {
      grant_type: `http://auth0.com/oauth/grant-type/password-realm`,
      realm: process.env.AUTH0_DB,
      username: email,
      password,
      audience: process.env.AUTH0_AUDIENCE,
      scope: "read:sample",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    },
    responseType: "json",
  };

  try {
    const tokenRes = await axios(options);
    res.status(200).send(tokenRes.data);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

export { registerUser, getToken, getAll, getSingle, createUser, updateUser, deleteUser };
