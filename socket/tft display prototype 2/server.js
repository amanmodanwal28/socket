const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 5000;


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected');
    // Function to preload media files and cache their URLs
    function emitMessage() {
        const marqueMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text        
         const staticMessage = "Unit 3"; // Static message
        const message = { staticMessage, marqueMessage};
        io.emit('message', message);
    }
    // Emit message when a client connects
    emitMessage();

    
    // Listen for message requests
    socket.on('request_message', () => {
        emitMessage();
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {    
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});


















// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const port = 5000;


// // Serve static files from the 'public' directory
// app.use(express.static(path.join(__dirname, 'public')));


// // Socket.io connection handling
// io.on('connection', (socket) => {
//     console.log('A user connected');
//     // Function to preload media files and cache their URLs
//     function emitMessage() {
//         const marqueMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text        
//         io.emit('message', marqueMessage);
//     }
//     // Emit message when a client connects
//     emitMessage();

    
//     // Handle disconnection
//     socket.on('disconnect', () => {    
//         console.log('A user disconnected');
//     });
// });

// // Start the server
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });