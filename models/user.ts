import mongoose from "mongoose";
import { User } from "../types/user";

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
