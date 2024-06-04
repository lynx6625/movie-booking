const url = require('../config/db-config.js').url;
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = url;
db.artists = require("./artist.model.js");
db.genres = require("./genre.model.js");
db.movies = require("./movie.model.js");
db.users = require("./user.model.js");

module.exports = db;
