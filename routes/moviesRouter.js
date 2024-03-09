const express = require("express");
const router = express.Router();
const pool = require("../db/queries");

// get all movies
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await pool.query("SELECT * FROM movies");
    res.json(allMovies.rows);
  } catch (err) {
    next(err);
  }
});

// get a movie by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await pool.query("SELECT * FROM movies WHERE id = $1", [id]);
    if (movie.rows.length === 0) {
      const error = new Error("Movie not found");
      error.name = "ErrorNotFound";
      throw error;
    }
    res.json(movie.rows[0]);
  } catch (err) {
    next(err);
  }
});

// post a movie
router.post("/", async (req, res, next) => {
  try {
    const { title, genres, year } = req.body;

    const newMovie = await pool.query(
      "INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3) RETURNING *",
      [title, genres, year]
    );
    res.status(201).json({
      message: "Movie successfully added",
      movie: newMovie.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// update a movie
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genres, year } = req.body;

    const updatedMovie = await pool.query(
      "UPDATE movies SET title = $1, genres = $2, year = $3 WHERE id = $4 RETURNING *",
      [title, genres, year, id]
    );
    if (updatedMovie.rows.length === 0) {
      const error = new Error("Movie not found");
      error.name = "ErrorNotFound";
      throw error;
    }
    res.status(200).json({
      message: "Movie successfully updated",
      movie: updatedMovie.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

// delete a movie
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMovie = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [id]
    );
    if (deletedMovie.rows.length === 0) {
      const error = new Error("Movie not found");
      error.name = "ErrorNotFound";
      throw error;
    }
    res.status(200).json({
      message: "Movie successfully deleted",
      movie: deletedMovie.rows[0],
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
