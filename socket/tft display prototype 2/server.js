const dgram = require('dgram');
const WebSocket = require('ws');
const MULTICAST_ADDRESS = '239.255.255.250'; // Multicast address
const MULTICAST_PORT = 30000; // Multicast port

const wss = new WebSocket.Server({ port: 8080 });
// Create UDP server socket
const server = dgram.createSocket('udp4');

// Event listener for errors
server.on('error', (err) => {
    console.error('UDP server error:', err);
    server.close(); // Close the server on error
});

// Event listener for receiving messages
server.on('message', (msg, rinfo) => {
    const message = msg.toString();
    console.log(`Received message from ${rinfo.address}:${rinfo.port} - ${message}`);
});

// Join the multicast group
server.on('listening', () => {
    server.addMembership(MULTICAST_ADDRESS);
    const address = server.address();
    console.log(`UDP server listening on ${address.address}:${address.port}`);
});

// Bind the server to the multicast port and address
server.bind(MULTICAST_PORT);






//  // its working the text data pass using udp 

// const http = require('http');
// const dgram = require('dgram');
// const WebSocket = require('ws');

// const server = dgram.createSocket('udp4');
// const wsServer = new WebSocket.Server({ noServer: true });

// const PORT = 30000; // Port for UDP server

// // HTTP server to serve the HTML page and upgrade WebSocket connections
// const httpServer = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(`
//         <html>
//         <head>
//         <title>UDP Message Receiver</title>
//         <style>
//         #messages {
//         font-size: 38px;
//         color: rgb(238, 54, 54);
//         font-weight: bold;
//         text-decoration: underline red ;
//         }
//         </style></head>
//         <body>
//             <h1>Received UDP Messages:</h1>
//             <ul id="messages"></ul>
//             <video width="320" height="240" controls>
//             <source src="./uploads/2.mp4" type="video/mp4">
//             </video>
//             <script>
//                 const socket = new WebSocket('ws://localhost:8080');

//                 socket.onmessage = function(event) {
//                     const messagesList = document.getElementById('messages');
//                     const li = document.createElement('li');
//                     li.textContent = event.data;
//                     messagesList.appendChild(li);
//                 };
//             </script>
//         </body>
//         </html>
//     `);
// });

// wsServer.on('connection', (ws) => {
//     console.log('WebSocket client connected');
// });

// // Upgrade WebSocket connections
// httpServer.on('upgrade', (request, socket, head) => {
//     wsServer.handleUpgrade(request, socket, head, (ws) => {
//         wsServer.emit('connection', ws, request);
//     });
// });

// httpServer.listen(8080, () => {
//     console.log('HTTP server listening on port 8080');
// });

// // UDP server to receive messages from clients
// server.on('listening', () => {
//     const address = server.address();
//     console.log(`UDP server listening on ${address.address}:${address.port}`);
// });
// server.bind(PORT);

// // Event listener for incoming UDP messages
// server.on('message', (msg, rinfo) => {
//     const message = msg.toString(); // Convert the received buffer to string
//     console.log(`Received message from ${rinfo.address}:${rinfo.port} - ${message}`);

//     // Send the message to all connected WebSocket clients
//     wsServer.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(message);
//         }
//     });
// });






















// const http = require('http');
// const dgram = require('dgram');
// const server = dgram.createSocket('udp4');

// const HOST = '0.0.0.0';
// const PORT = 30000;

// // Create a simple HTTP server to serve the HTML page
// const httpServer = http.createServer((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(`
//         <html>
//         <head><title>UDP Message Receiver</title></head>
//         <body>
//             <h1>Received UDP Messages:</h1>
//             <ul id="messages"></ul>
//             <script>
//                 const socket = new WebSocket('ws://localhost:8080');

//                 socket.onmessage = function(event) {
//                     const messagesList = document.getElementById('messages');
//                     const li = document.createElement('li');
//                     li.textContent = event.data;
//                     messagesList.appendChild(li);
//                 };
//             </script>
//         </body>
//         </html>
//     `);
// });

// // WebSocket server to send UDP messages to the client
// const WebSocket = require('ws');
// const wsServer = new WebSocket.Server({ server: httpServer });

// wsServer.on('connection', (ws) => {
//     console.log('WebSocket client connected');
//     // Event listener for incoming UDP messages
//     server.on('message', (msg, rinfo) => {
//         const message = `Received message from ${rinfo.address}:${rinfo.port} - ${msg}`;
//         console.log(message);
//         // Send the message to all connected WebSocket clients
//         wsServer.clients.forEach((client) => {
//             if (client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });
//     });
// });

// httpServer.listen(8080, () => {
//     console.log('HTTP server listening on port 8080');
// });

// // Bind UDP server to listen for messages
// server.on('listening', () => {
//     const address = server.address();
//     console.log(`UDP server listening on ${address.address}:${address.port}`);
// });
// server.bind(PORT, HOST);










// const dgram = require('dgram');
// const server = dgram.createSocket('udp4');

// const HOST = '0.0.0.0';
// const PORT = 30000;

// server.on('error', (err) => {
//     console.log(`server error:\n${err.stack}`);
//     server.close();
// });

// server.on('message', (msg, rinfo) => {
//     console.log(`Server received message from ${rinfo.address}:${rinfo.port} - ${msg}`);
// });

// server.on('listening', () => {
//     const address = server.address();
//     console.log(`server listening ${address.address}:${address.port}`);
// });

// server.bind({
//     address: HOST,
//     port: PORT,
//     exclusive: true
// });











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
//          const staticMessage = "Unit 3"; // Static message
//         const message = { staticMessage, marqueMessage};
//         io.emit('message', message);
//     }
//     // Emit message when a client connects
//     emitMessage();

    
//     // Listen for message requests
//     socket.on('request_message', () => {
//         emitMessage();
//     });
    
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