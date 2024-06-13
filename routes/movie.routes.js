const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
const {
  findAllMovies,
  findMovieById,
  findShows,
  getFilteredMovies,
  getMoviesByStatus,
} = require("../controllers/movie.controller");

// GET /api/movies
router.get("/", (req, res) => {
  findAllMovies(req, res);
});

// GET /api/movies?status=PUBLISHED
router.get("/", (req, res) => {
  getMoviesByStatus(req, res);
});

// GET /api/movies?status=RELEASED
router.get("/", (req, res) => {
  getMoviesByStatus(req, res);
});

// GET /api/movies/{movieId}
router.get("/:movieId", (req, res) => {
  findMovieById(req, res);
});

// GET /api/movies
router.get("/", (req, res) => {
  findShows(req, res);
});

// GET /api/movies?status=RELEASED&title={title}&genres={genres}&artists={artists}&start_date={startdate}&end_date={enddate}
router.get("/", (req, res) => {
  getFilteredMovies(req, res);
});

module.exports = router;
