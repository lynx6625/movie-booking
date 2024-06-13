const express = require("express");
const router = express.Router();
const genresController = require("../controllers/genre.controller");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.get("/", genresController.findAllGenres);

module.exports = router;
