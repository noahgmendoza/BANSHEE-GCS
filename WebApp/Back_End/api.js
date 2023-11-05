const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async/await
const path = require('path');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import UUID library for generating unique filenames
const cors = require('cors');

const app = express();
const port = 80;

const dataFilePath = path.join(__dirname, 'sensor_data/sample_data.json'); // Update with your JSON file path
const profilePath = path.join(__dirname, 'profiles/login.json'); // Update with your JSON file path
const database = path.join(__dirname, 'sensor_data'); //data directory 

let users = [];

//Enable CORS for all routes
app.use(cors());

// Array to store filenames
let uploadedFileNames = [];

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse JSON requests bodies
app.use(bodyParser.json());

// Check if the JSON file exists and read the initial data
async function readUserData() {
  try {
    const data = await fs.readFile(profilePath, 'utf-8');
    users = JSON.parse(data);
    console.log('Users data loaded successfully:', users);
  } catch (err) {
    console.error('Error reading user data:', err);
    users = [];
  }
}

  
// Function to write 'users' array to the JSON file
async function writeUserData() {
    try {
      await fs.writeFile(profilePath, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
      // Handle errors if the file cannot be written
      console.error('Error writing user data:', err);
    }
  }
   
  // Function to format a number as a two-digit string (e.g., 1 => "01")
  function formatAsTwoDigitString(number) {
    return number.toString().padStart(2, '0');
  }
  
  // Function to add a filename to the array and return the updated list
  function addFileName(filename) {
    uploadedFileNames.push(filename);
    return uploadedFileNames;
  }
  
  
  // Read filenames from the data directory and populate the array
  async function populateFileNamesArray() {
    try {
      const filenames = await fs.readdir(database);
      uploadedFileNames = filenames;
    } catch (error) {
      console.error('Error populating filenames array:', error);
    }
  }
  
  // Populate the filenames array on startup
  populateFileNamesArray();
  // Read initial user data when the server starts
  readUserData();
  
  
  // Define a GET route to read and return data from the JSON file
  app.get('/api/data', async (req, res) => {
    try {
        const data = await fs.readFile(dataFilePath, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

  // Define a GET route to read and return data from the JSON file
  app.get('/api/voltage', async (req, res) => {
    try {
        const data = await fs.readFile('voltage.json', 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
<<<<<<< HEAD
    app.get('/api/simple_voltage', async (req, res) => {
      try {
          const data = await fs.readFile('simple_voltage.json', 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(data);
        } catch (err) {
          console.error('Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
=======
>>>>>>> 0cde796fceeda3a554497b234cb1edb06528dfa5
    
    app.get('/users', (req, res) => {
        res.json(users)
      })
    
    app.post('/users', async (req, res) => {
        try {
          const hashedPassword = await bcrypt.hash(req.body.password, 10)
          const user = { name: req.body.name, password: hashedPassword }
          // Write the updated 'users' array to the JSON file
          users.push(user)
          await writeUserData();
          console.log("User added to array")
          res.status(201).send()
        } catch {
          res.status(500).send()
        }
      })
      
      app.post('/users/login', async (req, res) => {
        const user = users.find(user => user.name === req.body.name)
        if (user == null) {
          return res.status(400).send('Cannot find user')
        }
        try {
          if(await bcrypt.compare(req.body.password, user.password)) {
            res.send('Success')
          } else {
            res.send('Not Allowed')
          }
        } catch {
          res.status(500).send()
        }
      })
    
      app.post('/users/remove', async (req, res) => {
        try{
          users = users.filter(item => item.name !== req.body.name);
          await writeUserData();
          console.log('User removed: ' + req.body.name);
        }catch{
          res.status(500).send()
        }
      })
    
    // POST endpoint to handle the JSON payload with custom file path
    app.post('/sensor_data/upload', async (req, res) => {
      try {
        // Access the JSON data sent in the request body
        const requestData = req.body;

        // Get the current date and time
        const currentDate = new Date();
        
        // Extract the date components
        const year = currentDate.getFullYear();
        const month = formatAsTwoDigitString(currentDate.getMonth() + 1); // Adding 1 because months are zero-based
        const day = formatAsTwoDigitString(currentDate.getDate());
    
        // Extract the time components
        const hours = formatAsTwoDigitString(currentDate.getHours());
        const minutes = formatAsTwoDigitString(currentDate.getMinutes());
        const seconds = formatAsTwoDigitString(currentDate.getSeconds());
    
        // Generate a filename based on date and time
        const filename = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}.json`;
    
        // Specify the full file path including the custom directory
        const filePath = path.join(__dirname, '/sensor_data', filename);
    
        // Save the requestData to the specified file path using async/await
        await fs.writeFile(filePath, JSON.stringify(requestData, null, 2), 'utf-8');
        
        // Add the filename to the array directly
        uploadedFileNames.push(filename);
        
        // Send a success response
        res.status(200).json({ message: 'Data received and saved successfully', filename: filePath });
        console.log('Sensor data received: ' + filePath);
      } catch (error) {
        console.error('Sensor data upload error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    
    // GET endpoint to retrieve the list of filenames
    app.get('/sensor_data/files', (req, res) => {
      res.status(200).json({ filenames: uploadedFileNames });
    });
    
    // Start the Express server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
<<<<<<< HEAD
    
=======
    
>>>>>>> 0cde796fceeda3a554497b234cb1edb06528dfa5
