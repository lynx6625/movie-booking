const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());



app.use(express.json());  // Body parsing middleware
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
    
  })
  
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

  app.get("/", (req, res) => {
    res.json({ message: "Welcome to Upgrad Movie booking application development." });
  });
  
/*   Old routers commented out
app.get('/movies', function (req, res){
    res.send("All Movies Data in JSON format from Mongo DB");
});

app.get('/genres', function (req, res){
    res.send("All Genres Data in JSON format from Mongo DB");
});

app.get('/artists', function (req, res){
    res.send("All Artists Data in JSON format from Mongo DB");
});

*/


// Import routers
const movieRoutes = require('./routes/movie.routes.js');
const genreRoutes = require('./routes/genre.routes.js');
const artistRoutes = require('./routes/artist.routes.js');
const userRoutes = require('./routes/user.routes');

// Use routers
app.use('/', movieRoutes); // /movies, /movies/:movieId endpoints
app.use('/', genreRoutes); // /genres endpoint
app.use('/', artistRoutes); // /artists endpoint
app.use('/', userRoutes);



const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});