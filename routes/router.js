const express = require("express");

// Create a new router
const router = express.Router();
const moviesRouter = require("./moviesRouter.js");
const userRouter = require("./userRouter.js");

// Define the home page route
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Define the movies and user routes
router.use("/movies", moviesRouter);
router.use("/users", userRouter);

module.exports = router;
