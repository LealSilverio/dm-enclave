import app from "./app";
import connect from "./db/connect";

connect().catch((e) => console.log(e));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
