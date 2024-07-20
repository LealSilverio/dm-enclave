import { HydratedDocument, Document } from "mongoose";

const performFind = async (
  entity: HydratedDocument<any>,
  success: (record?: Document) => void,
  fail: (e: Error) => void,
  searchObj?: Object
) => {
  try {
    const foundRecord = await entity.find(searchObj || null);
    if (!foundRecord) {
      fail(new Error("failure from inside perform find"));
    } else {
      success(foundRecord);
      return foundRecord;
    }
  } catch (e) {
    console.error(e);
    fail(e);
  }
};

export default performFind;
