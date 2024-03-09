const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
