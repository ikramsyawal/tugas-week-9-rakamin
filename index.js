const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/router");
const errorHandler = require("./middlewares/errorHandler");
const morgan = require("morgan");

app.use(morgan("combined"));

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
