import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index";

const app = express();

app
  .use(express.json())
  .use(cors({ origin: "*" }))
  .use("/", routes);

export default app;
