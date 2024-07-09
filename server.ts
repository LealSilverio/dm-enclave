import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index";
import connect from "./db/connect";

const app = express();
const port = process.env.PORT || 5000;

connect().catch((e) => console.log(e));

app
  .use(express.json())
  .use(cors({ origin: "*" }))
  .use("/", routes);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
