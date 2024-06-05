const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieid: { type: Number, required: true },
    title: { type: String, required: true },
    published: { type: Boolean, required: true },
    released: { type: Boolean, required: true },
    poster_url: { type: String, required: true },
    release_date: { type: Date, required: true },
    publish_date: { type: Date, required: true },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
    genres: [{ type: String, required: true }],
    duration: { type: Number, required: true },
    critic_rating: { type: Number, required: true },
    trailer_url: { type: String, required: true },
    wiki_url: { type: String, required: true },
    story_line: { type: String, required: true },
    shows: [{
        id: Number,
        theatre: {
            name: String,
            city: String
        },
        language: String,
        show_timing: Date,
        available_seats: Number,
        unit_price: Number
    }]
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
