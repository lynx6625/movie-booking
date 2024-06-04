const express = require('express');
const app = express();

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



app.get('/movies', function (req, res){
    res.send("All Movies Data in JSON format from Mongo DB");
});

app.get('/genres', function (req, res){
    res.send("All Genres Data in JSON format from Mongo DB");
});

app.get('/artists', function (req, res){
    res.send("All Artists Data in JSON format from Mongo DB");
});


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});