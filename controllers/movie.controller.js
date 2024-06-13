const Movie = require('../models/movie.model'); // Assuming you have the Movie model defined

async function findAllMovies(req,res) {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (error) {
    console.error('Error retrieving movies:', error);   //Error Handling
    throw error;
  }
}


async function findMovieById(req,res) {
    try {
      const movieId = req.params.movieId;
      const movie = await Movie.findOne({movieid: movieId});
      res.status(200).send(movie);
    } catch (error) {
      console.error('Error retrieving movie:', error)    //Error Handling
      throw error;
    }
  }


  async function findShows(movieId) {
    try {
      const movie = await Movie.findById(movieId);
      if (!movie) {
        throw new Error('Movie not found');
      }
      return movie.shows;
    } catch (error) {
      console.error('Error retrieving shows:', error);  //Error Handling
      throw error;
    }
  }


// Get movies with a specific status
async function getMoviesByStatus(req, res) {
  const { status } = req.query;

  Movie.find({ status })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Failed to get movies.' });
    });
};


// Get filtered movies based on status, title, genres, artists, and date range
async function getFilteredMovies  (req, res) {
  const { status, title, genres, artists, start_date, end_date } = req.query;
  let query = { status };

  // Add filters based on query parameters
  if (title) {
    query.title = { $regex: title, $options: 'i' };
  }
  if (genres) {
    query.genres = { $in: genres.split(',') };
  }
  if (artists) {
    query.artists = { $in: artists.split(',') };
  }
  if (start_date && end_date) {
    query.release_date = { $gte: new Date(start_date), $lte: new Date(end_date) };
  }

  Movie.find(query)
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((error) => {
      res.status(500).send({ error: 'Failed to get movies.' });
    });
};


  module.exports = {
    findAllMovies,
    findMovieById,
    findShows,
    getMoviesByStatus,
    getFilteredMovies
  };



