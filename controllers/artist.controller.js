const Artist = require("../models/artist.model");

async function findAllArtists(req, res) {
  try {
    const artists = await Artist.find();
    res.status(200).send(artists);
  } catch (error) {
    throw new Error("Failed to fetch artists: " + error.message); //Error Handling
  }
}

module.exports = {
  findAllArtists,
};
