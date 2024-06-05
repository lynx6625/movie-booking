const Movie = require('../models/movie.model.js');


exports.findAllMovies = async (req, res) => {
    let query = {};
    if (req.query.status) {
        query.published = req.query.status.toUpperCase() === 'PUBLISHED';
    }
    try {
        const movies = await Movie.find(query);
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).send({ message: error.message || "Some error occurred while retrieving movies." });
    }
};



exports.findOne = async (req, res) => {
    try {
        const movie = await Movie.findOne({ movieid: req.params.movieId }); // Change here to use `findOne` with `movieid`
        if (!movie) {
            return res.status(404).send({ message: "Movie not found with id " + req.params.movieId });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).send({ message: "Error retrieving movie with id " + req.params.movieId });
    }
};



exports.findShows = async (req, res) => {
    try {
        const movie = await Movie.findOne({ movieid: req.params.movieId });
        if (!movie) {
            return res.status(404).send({ message: "Movie not found with id " + req.params.movieId });
        }
        res.status(200).json(movie.shows); // Directly accessing the embedded 'shows' array
    } catch (error) {
        res.status(500).send({ message: "Error retrieving shows for movie id " + req.params.movieId });
    }
};



