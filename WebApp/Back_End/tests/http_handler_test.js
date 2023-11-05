const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000; // Choose a port for your API

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Log when a request is received
  console.log(`Request received at ${new Date()}: ${req.method} ${req.url}`);

  if (req.method === 'GET' && req.url === '/api/data') {
    // Read data from a JSON file (you can replace this with your logic)
    const dataFilePath = path.join(__dirname, 'sample_data.json');
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
