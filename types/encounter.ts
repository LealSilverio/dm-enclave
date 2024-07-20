import { Types } from "mongoose";

export interface Encounter {
  name: string;
  ownerId: Types.ObjectId;
}
