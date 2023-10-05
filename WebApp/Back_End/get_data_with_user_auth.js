const express = require('express');
const fs = require('fs').promises; // Use fs.promises for async/await
const path = require('path');
const bcrypt = require('bcrypt')


const app = express();

const port = 3000;
const dataFilePath = path.join(__dirname, 'sensor_data/sample_data.json'); // Update with your JSON file path
const profilePath = path.join(__dirname, 'profiles/login.json'); // Update with your JSON file path

let users = []

// Middleware to parse JSON requests
app.use(express.json());

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

app.get('/users', (req, res) => {
    res.json(users)
  })

app.post('/users', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { name: req.body.name, password: hashedPassword }
      // Write the updated 'users' array to the JSON file
      await writeUserData();
      users.push(user)
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

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
