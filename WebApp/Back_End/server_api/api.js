const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async/await
const path = require('path');
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import UUID library for generating unique filenames
const cors = require('cors');
const f_ops = require('file_ops')

const app = express();
const port = 3000;

const dataFilePath = path.join(__dirname, 'sensor_data/sample_data.json'); // Update with your JSON file path
const profilePath = path.join(__dirname, 'profiles/login.json'); // Update with your JSON file path
//const database = path.join(__dirname, 'sensor_data'); //data directory 

// Enable CORS for all routes with specific options
app.use(cors({
  origin: 'http://rgs.bansheeuav.tech',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

// Middleware to parse JSON requests
app.use(express.json());
// Middleware to parse JSON requests bodies
app.use(bodyParser.json());

let users = [];

// Array to store filenames
const database = 'sensor_data'; // Set the correct path

// Read initial user data when the server starts
f_ops.readUserData(profilePath);
  
  
  // Define a GET route to read and return data from the JSON file
  app.get('/app/data', async (req, res) => {
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
  app.get('/app/voltage', async (req, res) => {
    try {
        const data = await fs.readFile('voltage.json', 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
      } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    app.get('/app/simple_voltage', async (req, res) => {
      try {
          const data = await fs.readFile('simple_voltage.json', 'utf-8');
          res.setHeader('Content-Type', 'application/json');
          res.status(200).send(data);
        } catch (err) {
          console.error('Error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });
    
    app.get('/app/users', (req, res) => {
        res.json(users)
      })
    
    app.post('/app/users', async (req, res) => {
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
      
      app.post('/app/users/login', async (req, res) => {
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
    
      app.post('/app/users/remove', async (req, res) => {
        try{
          users = users.filter(item => item.name !== req.body.name);
          await f_ops.writeUserData();
          console.log('User removed: ' + req.body.name);
        }catch{
          res.status(500).send()
        }
      })
    
    // POST endpoint to handle the JSON payload with custom file path
    app.post('/app/sensor_data/upload', async (req, res) => {
      try {
        // Access the JSON data sent in the request body
        const requestData = req.body;

        // Get the current date and time
        const currentDate = new Date();
        
        // Extract the date components
        const year = currentDate.getFullYear();
        const month = f_ops.formatAsTwoDigitString(currentDate.getMonth() + 1); // Adding 1 because months are zero-based
        const day = f_ops.formatAsTwoDigitString(currentDate.getDate());
    
        // Extract the time components
        const hours = f_ops.formatAsTwoDigitString(currentDate.getHours());
        const minutes = f_ops.formatAsTwoDigitString(currentDate.getMinutes());
        const seconds = f_ops.formatAsTwoDigitString(currentDate.getSeconds());
    
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
app.get('/app/sensor_data/files', async (req, res) => {
  try {
      res.status(200).json({ filenames: uploadedFileNames });
  } catch (error) {
      console.error('Error retrieving file names:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
    
// Function to initialize uploadedFileNames
async function initialize() {
  try {
      uploadedFileNames = await f_ops.populateFileNamesArray(database);
      console.log('Uploaded file names:', uploadedFileNames);

      // Now that the filenames are populated, you can start the server
      app.listen(port, () => {
          console.log(`Server is listening on port ${port}`);
      });
  } catch (error) {
      console.error('Error initializing file names:', error);
  }
}

// Call the initialization function
initialize();
