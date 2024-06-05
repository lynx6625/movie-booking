const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movie.controller.js');

router.get('/movies', moviesController.findAllMovies);
router.get('/movies/:movieId', moviesController.findOne);
router.get('/movies/:movieId/shows', moviesController.findShows);

module.exports = router;
