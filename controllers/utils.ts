import { Response } from "express";

const sendFailRes = (res: Response, e: any) => {
  res.status(500).json({ message: e.message });
};

export { sendFailRes };
