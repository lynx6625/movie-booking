const Genre = require('../models/genre.model.js');


exports.findAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find({});
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving genres." });
    }
};
