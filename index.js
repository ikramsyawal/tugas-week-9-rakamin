const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router");
const pool = require("./db/queries");

pool.connect((err, res) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to the database");
  }
});

app.use("/router", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
