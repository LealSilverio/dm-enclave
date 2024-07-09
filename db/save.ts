import { HydratedDocument, Document } from "mongoose";
import { Character } from "../types/character";

const performSave = async (
  entity: HydratedDocument<Character>,
  success: (record?: Document) => void,
  fail: (e: any) => void
) => {
  try {
    const savedRecord = await entity.save();
    if (!savedRecord) {
      fail({ message: "failure from inside perform save" });
    }
    success(savedRecord);
    return savedRecord;
  } catch (e) {
    console.error(e);
    fail(e);
  }
};

export default performSave;
