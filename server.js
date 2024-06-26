const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const db = require('./db/database');

app
  .use(express.json())
  .use(cors({origin: '*'}))
  .use('/', require('./routes'))
;

// Connect to the MongoDB server
db.connectDb((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Server running at http://localhost:${port}`);
    }
});
