const mongoose = require('mongoose');
const user = require('./utils/userSchema');
const rgs = require('./utils/rgsSchema');
require('dotenv').config(); 
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//Variables
const uri = process.env.DATABASE_URI;
const port = process.env.PORT || 3000;

//Express middleware
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://rgs.bansheeuav.tech/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

mongoose.connect(uri)
.then(()=>console.log("Mongodb connected successfully"))
.catch((err)=>console.log(err));

//User signup
app.post('/api/user/data', async (req, res) => {
  try {
      // Switch the database context to a different database named 'users'
      const db = mongoose.connection.useDb('users');

      // Initialize months array
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      // Initialize array to store mavlink data for all months
      const mavlinkDataForAllMonths = [];

      // Iterate over months and create entries for each month
      months.forEach(month => {
          mavlinkDataForAllMonths.push({
              month: month,
              data: [] // You can add more sample data here if needed
          });
      });

      // Create a new user document
      const newUser = new user({
          username: req.body.username,
          password: req.body.password,
          email: req.body.email,
          mavlink_data: mavlinkDataForAllMonths
      });

      // Save the new user to the database
      const savedUser = await newUser.save();
      console.log(savedUser); // Log the saved user object

      // Send a response indicating successful user signup along with the user ID
      res.send(`User signup received. ID: ${savedUser._id}`);
  } catch (err) {
      // If an error occurs, log the error
      console.log(err);
      res.status(500).send('Error occurred while processing your request.');
  }
});

//Add RGS by location
app.post('/api/rgs_details', async (req, res) =>{
        try{
            const newRGS = new rgs(req.body);
            const location = req.body.location;

            const RGS = await rgs.findOne({ location: location });
            if (RGS){
              res.send('RGS already exists');
            }else{
              const db = mongoose.connection.useDb('system_details');
              const savedRGS = await newRGS.save();
              console.log(savedRGS);
              res.send('New RGS added. ID:' + savedRGS._id);
            }
        }
        catch(err){
            console.log(err);
        }
    }
)

//Update voltages at RGS location
app.put('/api/rgs/voltages', async (req, res) =>{
  try {
    const newVoltages = req.body.battery_data;
    const query = { location: req.body.location };

    // Update the document with new voltages
    const updatedRGS = await rgs.findOneAndUpdate(query, { $set: { battery_data: newVoltages } }, {
      new: true
    });

    if (updatedRGS) {
      res.send('RGS data updated');
    } else {
      res.status(404).send('RGS data not found');
    }
  } catch(err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

//Send voltages to client
app.get('/api/rgs/voltages/:location', async (req, res) => {
  try {
    // Access location from route parameter
    const location = req.params.location;

    // Construct query
    const query = { location: location };

    // Perform the database query to find RGS details based on the location
    const RGS_details = await rgs.findOne(query);
    
    // Check if RGS details were found
    if (RGS_details) {
      // Send 200 OK status and the found RGS_details
      res.status(200).send(RGS_details);
    } else {
      // Send 404 if RGS details not found
      res.status(404).send('RGS details not found');
    }
  } catch (err) {
    // Log any errors that occur
    console.error(err);
    // Send a 500 Internal Server Error response
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/login', async (req, res) =>{
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
});
  
// Define a route to get all users
app.get('/api/users', async (req, res) => {
    try {
      // Retrieve all users from the database
      const users = await user.find();
      res.json(users); // Return the users as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.get('/api/user_details', async (req, res) => {
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
});

app.get('/api/latest_data', async (req, res) => {
  try {
    // Get the latest document based on the 'createdAt' field
    const latestDocument = await user.findOne({}, {}, { sort: { 'createdAt': -1 } });

    if (!latestDocument) {
      return res.status(404).send('No documents found');
    }

    res.send(latestDocument);
    console.log(latestDocument);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/api/users/mavlink_data/', async (req, res) => {
  try {
      const userID = req.body.userID;
      const month = req.body.month;
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
});


app.get('/api/users/:userID/mavlink_data/:month', async (req, res) => {
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
});


app.put('/api/users/mavlink_data/:month', async (req, res) => {
  try {
      const userID = req.params.userID;
      const month = req.params.month;
      const newMavlinkData = req.body;

      // Find the user by userId
      const user_document = await user.findById(userID);

      // Append the new mavlink_data object to the appropriate month's list
      const updatedUser = await user.findOneAndUpdate(
          { _id: userID },
          { $push: { 'mavlink_data.$[elem].data': newMavlinkData } },
          {
              arrayFilters: [{ 'elem.month': month }],
              new: true
          }
      );

      res.json(updatedUser);
  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
