import { Types } from "mongoose";

export interface User {
  name: string;
  ownerId: Types.ObjectId;
}
