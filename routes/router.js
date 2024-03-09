const express = require("express");

// Create a new router
const router = express.Router();
const moviesRouter = require("./moviesRouter.js");
const userRouter = require("./userRouter.js");
const authRouter = require("./authRouter.js");
const { authentication } = require("../middlewares/auth");

// Define the home page route
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// Define the movies and user routes
router.use("/auth", authRouter);
router.use(authentication);
router.use("/movies", moviesRouter);
router.use("/users", userRouter);

module.exports = router;
