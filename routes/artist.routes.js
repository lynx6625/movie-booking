const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artist.controller");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.get("/", artistsController.findAllArtists);

module.exports = router;
