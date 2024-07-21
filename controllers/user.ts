import UserModel from "../models/user";
import { Request, Response } from "express";
import performSave from "../db/save";
import { sendFailRes } from "./utils";
import axios, { AxiosRequestConfig } from "axios";
import { User } from "../types/user";
// import { performFind } from "../db/find";

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

const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    sendFailRes(res, e);
  }
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
  const { email, password, firstName, lastName, pictureUrl, type } = req.body;

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
      picture: pictureUrl,
      user_metadata: {
        type,
      },
    },
    responseType: "json",
  };

  try {
    const authRes = await axios(options);
    const { email, given_name, family_name, picture, _id } = authRes.data;
    const type = authRes.data.user_metadata.type;
    const newUser: User = {
      email,
      firstName: given_name,
      lastName: family_name,
      pictureUrl: picture,
      auth0Id: `auth0|${_id}`,
      type,
    };
    const newUserRecord = await performSave(
      new UserModel(newUser),
      (record) => res.status(200).send(record),
      (e) => sendFailRes(res, e)
    );
    if (!newUserRecord) {
      throw new Error("Failed to save user to database");
    }
  } catch (e) {
    sendFailRes(res, e);
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

export { registerUser, getToken, getAll, getUserById, updateUser, deleteUser };
