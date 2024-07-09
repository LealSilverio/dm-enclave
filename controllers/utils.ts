import { Response } from "express";

const sendFailRes = (res: Response, e: Error) => {
  res.status(500).json({ message: e.message });
};

export { sendFailRes };
