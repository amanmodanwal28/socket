// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5000;
const mediaFolder = path.join(__dirname, 'uploads');

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit a message to all connected clients
    io.emit('message', { text: 'A new user has connected', marqueMessage: 'PPS International' });

    // Function to preload media files and cache their URLs
    function preloadMedia() {
        fs.readdir(mediaFolder, (err, files) => {
            if (err) {
                console.error('Error reading media directory:', err);
                return;
            }
            const mediaUrls = files.map(file => `/uploads/${file}`);
            console.log('Preloaded media URLs:', mediaUrls);
            io.emit('mediaPreloaded', mediaUrls); // Emit to all connected clients
        });
    }

    // Handle request to preload media files
    socket.on('preloadMedia', preloadMedia);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});













// // server.js

// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const port = 5000;
// const mediaFolder = path.join(__dirname, 'uploads');



// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });



// // Socket.io connection handling
// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Function to preload media files and cache their URLs
//     function preloadMedia() {
//         fs.readdir(mediaFolder, (err, files) => {
//             if (err) {
//                 console.error('Error reading media directory:', err);
//                 return;
//             }
//             const mediaUrls = files.map(file => `/uploads/${file}`);
//             console.log('Preloaded media URLs:', mediaUrls);
//             socket.emit('mediaPreloaded', mediaUrls);
//         });
//     }

//     // Handle request to preload media files
//     socket.on('preloadMedia', preloadMedia);

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

// // Start the server
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
