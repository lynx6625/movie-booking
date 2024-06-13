const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Upgrad Movie booking application development.",
  });
});

app.use("/api/movies", require("./routes/movie.routes"));
app.use("/api/genres", require("./routes/genre.routes"));
app.use("/api/artists", require("./routes/artist.routes"));
app.use("/api/auth", require("./routes/user.routes"));

const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
