const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const rgsRoutes = require('./routes/rgsRoutes');
const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');

dotenv.config();

const app = express();
const port = process.env.PORT;
const uri = process.env.DATABASE_URI;

// Load SSL key and certificate files
const privateKey = fs.readFileSync('/etc/letsencrypt/live/rgs.bansheeuav.tech/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/rgs.bansheeuav.tech/fullchain.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Create an HTTPS server with WebSocket support
const server = https.createServer(credentials);
const wss = new WebSocket.Server({ server });

// Maintain a list of connections for the sending and reading frames clients
const sendingClients = new Set();
const readingClients = new Set();

app.use(express.json());
app.use(cors({
  origin: 'https://rgs.bansheeuav.tech/',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

mongoose.connect(uri)
  .then(() => console.log("Mongodb connected successfully"))
  .catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/rgs', rgsRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
    console.log('WebSocket client connected:', req.url);

    // Check the request URL to determine the endpoint path
    const endpoint = req.url;

    if (endpoint === '/sending_frames') {
        console.log('Client connected to sending frames');
        sendingClients.add(ws);
    } else if (endpoint === '/read_frames') {
        console.log('Client connected to read frames');
        readingClients.add(ws);
    }

    // Handle close event for each WebSocket connection
    ws.on('close', () => {
        console.log('WebSocket client disconnected:', req.url);
        if (endpoint === '/sending_frames') {
            sendingClients.delete(ws);
        } else if (endpoint === '/read_frames') {
            readingClients.delete(ws);
        }
    });

    // Handle received frames and forward them to clients connected to read_frames
    ws.on('message', (message) => {
        if (endpoint === '/sending_frames') {
            // Forward 'sending_frames' data to clients connected to 'read_frames'
            readingClients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
    });
});

// Start the HTTPS server
server.listen(3000, () => {
    console.log('Secure WebSocket server running on port 3000');
});

// Error handling for server setup
server.on('error', (error) => {
    console.error('Error starting server:', error);
});
