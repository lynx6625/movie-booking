const User = require('../models/user.model');
const uuid = require('uuid');
const Movie = require('../models/movie.model');

// SignUp function
exports.signUp = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: "Content cannot be empty!" });
    }

    // Create a User
    const user = new User({
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: `${req.body.first_name}${req.body.last_name}`,
        contact: req.body.contact,
        password: req.body.password,
        role: req.body.role || "user", 
        isLoggedIn: false,
        uuid: uuid.v4(), 
        accesstoken: "",
        coupens: req.body.coupens || [],
        bookingRequests: req.body.bookingRequests || []
    });

    // Saving the new user in schema
    try {
        const data = await user.save();
        res.send(data);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Some error occurred while creating the User."
        });
    }
};

// Login Function
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            username: `${req.body.first_name}${req.body.last_name}`,
            password: req.body.password
        });
        if (!user) {
            return res.status(404).send({ message: "Invalid username or password!" });
        }
        user.isLoggedIn = true;
        user.accesstoken = uuid.v4();
        await user.save();
        res.send({ message: "Login successful!", user });
    } catch (error) {
        res.status(500).send({
            message: "Error during login"
        });
    }
};

// Logout function
exports.logout = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body.userid, {
            isLoggedIn: false,
            accesstoken: ""
        }, { new: true });
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send({ message: "Logged out successfully!" });
    } catch (error) {
        res.status(500).send({
            message: "Error logging out"
        });
    }
};

// Get Coupon Code function

exports.getCouponCode = async (req, res) => {
    try {
        const user = await User.findById(req.body.userid);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send(user.coupens);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving coupon codes for user with ID " + req.body.userid
        });
    }
};


// Get Coupon Code function
exports.getCouponCode = async (req, res) => {
    try {
        const user = await User.findById(req.body.userid);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }
        res.send(user.coupens);
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving coupon codes for user with ID " + req.body.userid
        });
    }
};

exports.bookShow = async (req, res) => {
    try {
        // Find the user
        const user = await User.findById(req.body.userid);
        if (!user) {
            return res.status(404).send({ message: "User not found." });
        }

        // Find the movie that contains the show
        const movie = await Movie.findOne({ "shows.id": req.body.show_id });
        if (!movie) {
            return res.status(404).send({ message: "Show not found." });
        }

        // Extract the specific show from the movie's shows array
        const show = movie.shows.find(show => show.id === req.body.show_id);
        if (!show) {
            return res.status(404).send({ message: "Show not found in movie." });
        }

        // Assume a check here for available seats and other validations
        if (show.available_seats < req.body.tickets.length) {
            return res.status(400).send({ message: "Not enough seats available." });
        }

        // Update the available seats
        show.available_seats -= req.body.tickets.length;

        // Add to user's booking requests
        user.bookingRequests.push({
            reference_number: Math.floor(Math.random() * 1000000),
            coupon_code: req.body.coupon_code,
            show_id: req.body.show_id,
            tickets: req.body.tickets
        });

        // Save updates to both user and movie
        await user.save();
        await movie.save();

        res.send({ message: "Show booked successfully!", bookingDetails: user.bookingRequests.slice(-1)[0] });
    } catch (error) {
        res.status(500).send({
            message: "Error booking show for user with ID " + req.body.userid
        });
    }
};