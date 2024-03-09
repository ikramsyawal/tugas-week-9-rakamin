const express = require("express");
const router = express.Router();
const pool = require("../db/queries");
const { authorization } = require("../middlewares/auth");

// get all users
router.get("/", async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const allUsers = await pool.query(
      "SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2",
      [limit, offset]
    );
    res
      .status(200)
      .json({ message: `Page ${page} of users `, user: allUsers.rows });
  } catch (err) {
    next(err);
  }
});

// get a user by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (user.rows.length === 0) {
      const error = new Error("User not found");
      error.name = "ErrorNotFound";
      throw error;
    }
    res.status(200).json(user.rows[0]);
  } catch (err) {
    next(err);
  }
});

// post a new user
router.post("/", authorization, async (req, res, next) => {
  try {
    const { email, gender, password, role } = req.body;
    const newUser = await pool.query(
      "INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [email, gender, password, role]
    );
    res.status(201).json({
      message: "new user successfully created",
      user: newUser.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// update a user
router.put("/:id", authorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, gender, password, role } = req.body;

    const updatedUser = await pool.query(
      "UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *",
      [email, gender, password, role, id]
    );
    if (updatedUser.rows.length === 0) {
      const error = new Error("User not found");
      error.name = "ErrorNotFound";
      throw error;
    }
    res.status(200).json({
      message: "User successfully updated",
      user: updatedUser.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// delete a user
router.delete("/:id", authorization, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedUser.rows.length === 0) {
      const error = new Error("User not found");
      error.name = "ErrorNotFound";
      throw error;
    }
    res.status(200).json({
      message: "User successfully deleted",
      user: deletedUser.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
