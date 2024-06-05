const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genre.controller');

router.get('/genres', genresController.findAllGenres);

module.exports = router;
