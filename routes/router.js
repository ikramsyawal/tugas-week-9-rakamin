const express = require("express");
const router = express.Router();
const moviesRouter = require("./moviesRouter.js");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});
router.use("/movies", moviesRouter);

module.exports = router;
