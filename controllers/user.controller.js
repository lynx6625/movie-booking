const User = require('../models/user.model');
const { v4: uuidv4 } = require('uuid');
const TokenGenerator = require('uuid-token-generator');
const tokgen = new TokenGenerator(); 

// signUp() - to create a USER object and save it in USER schema
const signUp = async (req, res) => {
  const { first_name, last_name ,email_address,password,mobile_number} = req.body;


  const uuid = uuidv4();
  const accessToken =  tokgen.generate();


  try {
    const user = new User({
      first_name: first_name,
      last_name: last_name,
      userid: first_name+last_name,   
      email: email_address,
      contact: mobile_number,
      password: password,
      uuid: uuid,
      accesstoken: accessToken,
      isLoggedIn: true,
    });

   const newUser =  await user.save();

    res.status(201).send(newUser); 
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user',  details: error.message });
  }
};

// login function to check if details are in schema
const login = async (req, res) => {
  const { username, password, accessToken } = req.body;

  try {
    const user = await User.findOne({ username });  // Find the user by username

    if (!user) {
      return res.status(401).send({ error: 'Invalid username or password' });  // User not found
    }

    console.log(user);

    if (user.password !== password) {
      return res.status(401).send({ error: 'Invalid username or password' });  // Password is wrong
    }

    if (user.accessToken !== accessToken) {
      return res.status(401).send({ error: 'Error Logging in.' });  // Access token is wrong
    }
    
    res.send(user);  // Sending user to db
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).send({ error: 'Internal server error',  details: error.message});
  }
}


const logout = async (req, res) => {
const {uuid} = req.body;
try {
    const user = await User.findOne({uuid});

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    user.isLoggedIn = false;
    await user.save();

    res.status(200).send({ message: 'Logged Out successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: 'Failed to log out' });
  }
};


// Function to get coupon codes from the User model
const getCouponCodes = async (req, res) => {
    try {
      const userId = req.params.userId; // Assuming you have the userId as a parameter
  
      // Retrieve the User document by userId
      const user = await User.find({userid : userId});
  
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      // Extract the coupon codes from the user document
      const couponCodes = user.coupens;
  
      res.status(200).send(couponCodes);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch coupon codes' });
    }
  };


  const bookShow = async (req, res) => {
    
    const {customerUuid , bookingRequest} = req.body;
    console.log(bookingRequest);
    try {
      const user = await User.findOne({uuid : customerUuid});
  
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
     
      console.log(user);

      // Add the booking request to the user's bookingRequests array
       user.bookingRequests.push(bookingRequest);
  
      // Save the updated user document
      await user.save();
  
      res.status(201).send({ message: 'Show booked successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: 'Failed to book show' });
    }
  };

module.exports = {signUp,login,logout,getCouponCodes,bookShow}