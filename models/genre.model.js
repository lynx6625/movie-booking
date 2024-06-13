const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  //as per model in db
  genreid: { type: Number, required: true },
  genre: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreSchema);
module.exports = Genre;
