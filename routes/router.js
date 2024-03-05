const express = require("express");
const router = express.Router();
const db = require("../db/queries");

router.get("/get", (req, res) => {
  res.send("Hello from get");
});

router.post("/post", (req, res) => {
  res.send("Hello from post");
});

router.put("/put", (req, res) => {
  res.send("Hello from put");
});

router.delete("/delete", (req, res) => {
  res.send("Hello from delete");
});

module.exports = router;
