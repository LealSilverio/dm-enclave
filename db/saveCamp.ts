import { HydratedDocument, Document } from "mongoose";
import { Campaign } from "../types/campaign";

const performCampSave = async (
  entity: HydratedDocument<Campaign>,
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


export default performCampSave;
