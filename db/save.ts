import { HydratedDocument, Document } from "mongoose";

const performSave = async (
  entity: HydratedDocument<any>,
  success: (record?: Document) => void,
  fail: (e: Error) => void
) => {
  try {
    const savedRecord = await entity.save();
    if (!savedRecord) {
      fail(new Error("failure from inside perform save"));
    } else {
      success(savedRecord);
      return savedRecord;
    }
  } catch (e) {
    console.error(e);
    fail(e);
  }
};

export default performSave;
