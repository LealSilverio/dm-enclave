import { HydratedDocument, Document } from "mongoose";
import { Encounter } from "../types/encounter";

const performEncSave = async (
  entity: HydratedDocument<Encounter>,
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

export default performEncSave;
