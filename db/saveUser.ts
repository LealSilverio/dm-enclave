import { HydratedDocument, Document } from "mongoose";
import { User } from "../types/user";

const performUserSave = async (
  entity: HydratedDocument<User>,
  success: (record?: Document) => void,
  fail: (e: Error) => void
) => {
  try {
    const savedRecord = await entity.save();
    if (!savedRecord) {
      fail(new Error("failure from inside perform save"));
    }
    success(savedRecord);
    return savedRecord;
  } catch (e) {
    console.error(e);
    fail(e);
  }
};

export default performUserSave;
