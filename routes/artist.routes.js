const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artist.controller');

router.get('/artists', artistsController.findAllArtists);

module.exports = router;
