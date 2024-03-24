const user = require('../utils/userSchema.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Function to initialize mavlink data for all months
const initializeMavlinkData = () => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.map(month => ({ month, data: [] }));
};

const userController = {
  signup: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if user with the provided username or email already exists
      const existingUser = await user.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
          console.log('User already exists');
          return res.status(409).json({ message: 'User already exists' });
      }

      // Create a new user document
      const newUser = new user({
          username,
          email,
          password: password,
          mavlink_data: initializeMavlinkData()
      });

      // Save the new user to the database
      const savedUser = await newUser.save();
      console.log(`User signup successful: ${savedUser._id}`);

      // Send a response indicating successful user signup along with the usedID
      res.status(201).json({ message: 'User signup successful', userId: savedUser._id });

  } catch (error) {
      console.log(`Error occurred during user signup: ${error.message}`);
      res.status(500).json({ message: 'Error occurred while processing your request' });
  }
  },
  login: async (req, res) => {
  //Verify user credentials
  const {username, password} = req.body;

  try{
    const client = await user.findOne({username,password});

    if(client){
      const token = jwt.sign({ userid: client._id }, 'secret', { expiresIn: '1h' });
      res.json({ userid: client._id, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials'});
    }
  }catch(error){
    console.error('Error finding user:', error);
    res.status(500).json({ message: 'Internal server error'});
  }
  },
  // getAllUsers: async (req, res) => {
  //   try {
  //       // Retrieve all users = require( the database
  //       const users = await user.find();
  //       res.json(users); // Return the users as a JSON response
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ message: 'Server error' });
  //     }
  // },
  getMavlinkData: async (req, res) => {
    try {
        const userID = req.params.userID;
        const month = req.params.month;
    
        const user_document = await user.findById(userID);
    
        if (!user_document) {
          console.log("User not found");
          return res.status(404).json({ error: "User not found" });
        }
    
        // Find the entry for the specified month
        let mavlinkDataEntry = user_document.mavlink_data.find(entry => entry.month === month);
        if (!mavlinkDataEntry) {
          console.log(`No data saved under ${month}`);
          return res.status(404).json({ message: `No data saved under ${month}` });
        }
    
        res.json(mavlinkDataEntry);
      } catch (error) {
        console.error('Error fetching mavlink data:', error);
        res.status(500).json({ error: 'Failed to fetch mavlink data' });
      }
  },
  uploadMavlinkData: async (req, res) => {
    try {
        const userID = req.body.userID;
        const month = req.params.month;
        const newMavlinkData = req.body.data;
  
        // Validate inputs
        if (!userID || !month || !newMavlinkData) {
            return res.status(400).json({ error: 'Invalid input data' });
        }
  
        // Find the user document
        const user_document = await user.findById(userID);
        if (!user_document) {
            return res.status(404).json({ error: 'User not found' });
        }
  
        // Find or create the entry for the specified month and push new data
        await user.findOneAndUpdate(
            { _id: userID, 'mavlink_data.month': month },
            { $push: { 'mavlink_data.$.data': { $each: newMavlinkData } } },
            { upsert: true }
        );
  
        res.status(200).json({ message: 'Indexes appended successfully' });
    } catch (error) {
        console.error('Error appending indexes:', error);
        res.status(500).json({ error: 'Failed to append indexes' });
    }
  },
  details: async (req, res) => {
    const ID= req.body.ID; // Assuming the ID is passed as a query parameter

    try {
      console.log('Searching for document with _id:', ID);
      // Find the document by its _id
      try {
        const docs = await user.findById(ID);
        console.log("Result : ", docs);
        res.send(docs);
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = userController;
