const Genre = require("../models/genre.model");

const findAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).send(genres);
  } catch (error) {
    throw new Error("Failed to fetch genres: " + error.message); //Error Handling
  }
};

module.exports = {
  findAllGenres,
};
