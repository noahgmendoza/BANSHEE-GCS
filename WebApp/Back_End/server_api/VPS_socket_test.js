const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve your static files (HTML, CSS, JavaScript)
app.use(express.static('public'));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle events when a user sends a message
  socket.on('chat message', (message) => {
    io.emit('chat message', message); // Broadcast the message to all connected clients
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const serverIp = process.env.SERVER_IP || '149.28.81.138';
const serverPort = process.env.SERVER_PORT || 80;

server.listen(serverPort, serverIp, () => {
  console.log(`Server is running on http://${serverIp}:${serverPort}`);
});
