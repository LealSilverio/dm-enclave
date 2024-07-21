import mongoose from "mongoose";
import { User } from "../types/user";

const UserSchema = new mongoose.Schema<User>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  pictureUrl: {
    type: String,
    required: true,
  },
  auth0Id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["player", "dm"],
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
