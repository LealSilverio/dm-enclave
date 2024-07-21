import UserModel from "../models/user";
import { Request, Response } from "express";
import performSave from "../db/save";
import { sendFailRes } from "./utils";
import axios, { AxiosRequestConfig } from "axios";
import { User } from "../types/user";
import performFind from "../db/find";
import { auth } from "express-oauth2-jwt-bearer";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await performFind(
    UserModel,
    (records) => res.status(200).json(records),
    (e) => sendFailRes(res, e)
  );
  if (!users) {
    throw new Error("Failed to retrieve users");
  }
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
    console.log(e);
    sendFailRes(res, e);
  }
};

const getManagementApiToken = async () => {
  const options: AxiosRequestConfig = {
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    data: {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      grant_type: "client_credentials",
    },
    responseType: "json",
  };
  try {
    const res = await axios(options);
    return res.data.access_token;
  } catch (e) {
    console.error(e);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  let newUserData = req.body;
  const allowedProperties = [
    "firstName",
    "lastName",
    "pictureUrl",
    "type",
    "email",
  ];
  let exitFlag = false;
  Object.keys(newUserData).forEach((key) => {
    if (!exitFlag) {
      if (newUserData[key] === "" || !allowedProperties.includes(key)) {
        sendFailRes(res, new Error(`Invalid property: ${key}`));
        exitFlag = true;
        return;
      }
    }
  });
  if (exitFlag) {
    return;
  }
  try {
    let newAuth0UserData = {
      given_name: newUserData.firstName,
      family_name: newUserData.lastName,
      picture: newUserData.pictureUrl,
      email: newUserData.email,
    };
    Object.keys(newAuth0UserData).forEach((key) => {
      if (!newAuth0UserData[key]) {
        delete newAuth0UserData[key];
      }
    });
    if (newUserData.type) {
      newAuth0UserData["user_metadata"] = { type: newUserData.type };
    }
    const token = await getManagementApiToken();
    const auth0Id = (await UserModel.findById(userId).select("auth0Id"))
      .auth0Id;
    const auth0ReqOptions: AxiosRequestConfig = {
      method: "patch",
      headers: {
        authorization: `Bearer ${token}`,
      },
      url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`,
      data: {
        connection: process.env.AUTH0_DB,
        client_id: process.env.CLIENT_ID,
        ...newAuth0UserData,
      },
      responseType: "json",
    };
    const auth0Res = await axios(auth0ReqOptions);
    if (auth0Res) {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        newUserData,
        { new: true }
      );
      if (updatedUser) {
        res.status(200).send(updatedUser);
      } else {
        throw new Error("Failed to update user");
      }
    }
  } catch (e) {
    console.log(e);
    sendFailRes(res, e);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const setupAuth0Delete = async () => {
    try {
      const token = await getManagementApiToken();
      const auth0Id = (await UserModel.findById(userId).select("auth0Id"))
        .auth0Id;
      const auth0ReqOptions: AxiosRequestConfig = {
        method: "delete",
        headers: {
          authorization: `Bearer ${token}`,
        },
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`,
        responseType: "json",
      };
      return auth0ReqOptions;
    } catch (e) {
      console.log(e);
    }
  };
  const performAuth0Delete = async (auth0ReqOptions: AxiosRequestConfig) => {};
  try {
    const auth0ReqOptions = await setupAuth0Delete();
    const auth0Res = await axios(auth0ReqOptions);
    if (auth0Res) {
      const deletedUser = await UserModel.findByIdAndDelete(userId);
      if (deletedUser) {
        res.status(200).send(deletedUser);
      } else {
        throw new Error("Failed to delete user");
      }
    }
  } catch (e) {
    console.log(e);
    sendFailRes(res, e);
  }
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

const performLogout = async (req: Request, res: Response) => {
  const options: AxiosRequestConfig = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
    url: `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.CLIENT_ID}`,
    responseType: "json",
  };
  try {
    const logoutRes = await axios(options);
    if (logoutRes.status == 200) {
      res.status(200).send({ message: "logout successful🤞" });
    } else {
      throw new Error("Failed to logout");
    }
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
};

export {
  registerUser,
  getToken,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  performLogout,
};
