import { Types } from "mongoose";

export interface User {
  name: string;
  type: "player" | "dm";
  ownerId: Types.ObjectId;
}
