import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/index.js";
// import db from "./db/database";

const app = express();
const port = process.env.PORT || 5000;

app
  .use(express.json())
  .use(cors({ origin: "*" }))
  .use("/", routes);

const connect = () => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
};

connect();

// Connect to the MongoDB server
// db.connectDb((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     connect();
//   }
// });
