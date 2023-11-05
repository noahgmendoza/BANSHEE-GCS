// Importing libraries
const fs = require('fs');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app); // Creates the HTTP server
const io = socketIO(server); // Create socket for server side

const JSON_FILE_PATH = 'voltage.json'; // Update this with your JSON file path

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    // Read and send the initial JSON data when a client connects
    fs.readFile(JSON_FILE_PATH, 'utf8', (err, data) => {
        if (!err) {
            socket.emit('json-update', JSON.parse(data));
        } else {
            console.error('Error reading the JSON file:', err);
        }
    });
});

// Periodically read and broadcast updates from the JSON file
const updateInterval = 1000; // 1 second
setInterval(() => {
    fs.readFile(JSON_FILE_PATH, 'utf8', (err, data) => {
        if (!err) {
            io.sockets.emit('json-update', JSON.parse(data));
        } else {
            console.error('Error reading the JSON file:', err);
        }
    });
}, updateInterval);

server.listen(6000, () => {
    console.log('Server is running on port 6000');
});
