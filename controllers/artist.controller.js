const Artist = require('../models/artist.model.js');


exports.findAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find({});
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving artists." });
    }
};
