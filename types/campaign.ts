import { Types } from "mongoose";

export interface Campaign {
  name: string;
  ownerId: Types.ObjectId;
}
