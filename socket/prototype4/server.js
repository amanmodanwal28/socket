const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const dgram = require('dgram');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const udpSocket = dgram.createSocket({ type: 'udp4' });

// Serve your static files (if any)
app.use(express.static(__dirname + '/public'));

// Define multicast group and port
const multicastAddress = '239.192.0.1'; // Example multicast address
const multicastPort = 12345;

// Function to read the contents of the 'uploads' folder
function readUploadsFolder() {
  return new Promise((resolve, reject) => {
    fs.readdir('./uploads', (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
}

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A client connected');

  // Send the list of files in the 'uploads' folder when a client connects
  readUploadsFolder().then((files) => {
    io.emit('fileList', files);
  }).catch((err) => {
    console.error('Error reading uploads folder:', err);
  });

  // Watch the 'uploads' folder for changes
  fs.watch('./uploads', (eventType, filename) => {
    if (eventType === 'rename' || eventType === 'change') {
      // If a file is added, removed, or modified, send the updated list to all clients
      readUploadsFolder().then((files) => {
        io.emit('fileList', files);
      }).catch((err) => {
        console.error('Error reading uploads folder:', err);
      });
    }
  });

  // Handle incoming messages from clients
  socket.on('message', (msg) => {
    console.log('Message received from client:', msg);
    // Broadcast the message to all connected clients
    io.emit('message', msg);

    // Send the message via UDP multicast
    udpSocket.send(msg, 0, msg.length, multicastPort, multicastAddress, (err) => {
      if (err) {
        console.error('Error sending message via UDP multicast:', err);
      } else {
        console.log('Message sent via UDP multicast:', msg);
      }
    });
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// UDP socket listening for incoming multicast messages
udpSocket.on('message', (msg, rinfo) => {
  console.log(`Message received via UDP multicast: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

// Bind UDP socket to multicast port
udpSocket.bind(multicastPort, () => {
  console.log(`UDP socket is listening on port ${multicastPort} for multicast messages`);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


















// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const dgram = require('dgram');
// const fs = require('fs');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// const udpSocket = dgram.createSocket({ type: 'udp4' });

// // Serve your static files (if any)
// app.use(express.static(__dirname + '/public'));

// // Define multicast group and port
// const multicastAddress = '239.192.0.1'; // Example multicast address
// const multicastPort = 12345;

// // Function to read the contents of the 'uploads' folder
// function readUploadsFolder() {
//   return new Promise((resolve, reject) => {
//     fs.readdir('./uploads', (err, files) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(files);
//       }
//     });
//   });
// }

// // Handle Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Send the list of files in the 'uploads' folder when a client connects
//   readUploadsFolder().then((files) => {
//     io.emit('fileList', files);
//   }).catch((err) => {
//     console.error('Error reading uploads folder:', err);
//   });

//   // Watch the 'uploads' folder for changes
//   fs.watch('./uploads', (eventType, filename) => {
//     if (eventType === 'rename' || eventType === 'change') {
//       // If a file is added, removed, or modified, send the updated list to all clients
//       readUploadsFolder().then((files) => {
//         io.emit('fileList', files);
//       }).catch((err) => {
//         console.error('Error reading uploads folder:', err);
//       });
//     }
//   });

//   // Handle incoming messages from clients
//   socket.on('message', (msg) => {
//     console.log('Message received from client:', msg);
//     // Broadcast the message to all connected clients
//     io.emit('message', msg);

//     // Send the message via UDP multicast
//     udpSocket.send(msg, 0, msg.length, multicastPort, multicastAddress, (err) => {
//       if (err) {
//         console.error('Error sending message via UDP multicast:', err);
//       } else {
//         console.log('Message sent via UDP multicast:', msg);
//       }
//     });
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // UDP socket listening for incoming multicast messages
// udpSocket.on('message', (msg, rinfo) => {
//   console.log(`Message received via UDP multicast: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// // Bind UDP socket to multicast port
// udpSocket.bind(multicastPort, () => {
//   console.log(`UDP socket is listening on port ${multicastPort} for multicast messages`);
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

























// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const dgram = require('dgram');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// const udpSocket = dgram.createSocket({ type: 'udp4' });

// // Serve your static files (if any)
// app.use(express.static(__dirname + '/public'));

// // Define multicast group and port
// const multicastAddress = '239.192.0.1'; // Example multicast address
// const multicastPort = 12345;

// // Handle Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Handle incoming messages from clients
//   socket.on('message', (msg) => {
//     console.log('Message received from client:', msg);
//     // Broadcast the message to all connected clients
//     io.emit('message', msg);

//     // Send the message via UDP multicast
//     udpSocket.send(msg, 0, msg.length, multicastPort, multicastAddress, (err) => {
//       if (err) {
//         console.error('Error sending message via UDP multicast:', err);
//       } else {
//         console.log('Message sent via UDP multicast:', msg);
//       }
//     });
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // UDP socket listening for incoming multicast messages
// udpSocket.on('message', (msg, rinfo) => {
//   console.log(`Message received via UDP multicast: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// // Bind UDP socket to multicast port
// udpSocket.bind(multicastPort, () => {
//   console.log(`UDP socket is listening on port ${multicastPort} for multicast messages`);
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });































// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const dgram = require('dgram');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// const udpSocket = dgram.createSocket({ type: 'udp4' });

// // Serve your static files (if any)
// app.use(express.static(__dirname + '/public'));

// // Define multicast group and port
// const multicastAddress = '239.192.0.1'; // Example multicast address
// const multicastPort = 12345;

// // Handle Socket.IO connections
// io.on('connection', (socket) => {
//   console.log('A client connected');

//   // Handle incoming messages from clients
//   socket.on('message', (msg) => {
//     console.log('Message received from client:', msg);
//     // Broadcast the message to all connected clients
//     io.emit('message', msg);

//     // Send the message via UDP multicast
//     udpSocket.send(msg, 0, msg.length, multicastPort, multicastAddress, (err) => {
//       if (err) {
//         console.error('Error sending message via UDP multicast:', err);
//       } else {
//         console.log('Message sent via UDP multicast:', msg);
//       }
//     });
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A client disconnected');
//   });
// });

// // UDP socket listening for incoming multicast messages
// udpSocket.on('message', (msg, rinfo) => {
//   console.log(`Message received via UDP multicast: ${msg} from ${rinfo.address}:${rinfo.port}`);
// });

// // Bind UDP socket to multicast port
// udpSocket.bind(multicastPort, () => {
//   console.log(`UDP socket is listening on port ${multicastPort} for multicast messages`);
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });















// const dgram = require('dgram');

// // Create a UDP socket
// const socket = dgram.createSocket({ type: 'udp4' });

// // Define the multicast group and port
// const multicastAddress = '239.192.0.1'; // Example multicast address
// const multicastPort = 12345;

// // Join the multicast group
// socket.on('listening', () => {
//   socket.addMembership(multicastAddress);
//   console.log(`Joined multicast group ${multicastAddress}`);
// });

// // Handle incoming messages
// socket.on('message', (msg, rinfo) => {
//   console.log(`message from other device: ${msg} from ${rinfo.address}:${rinfo.port}`);

  
// });
// // Bind the socket to the multicast port
// socket.bind(multicastPort, () => {
//   console.log(`UDP socket is listening on port ${multicastPort} for multicast messages`);
// });


















// const dgram = require('dgram');
// // Create a UDP socket
// const socket = dgram.createSocket({ type: 'udp4' });
// // Define the multicast group and port
// const multicastAddress = '239.192.0.1'; // Example multicast address
// const multicastPort = 12345;

// // Initialize message count
// let messageCount = 0;

// setInterval(sendMessage, 2000)


// function sendMessage() {
//     // Increment message count
//   messageCount++;

//  // Construct message with count
//   const message = `Message ${messageCount}: Hello from sender from aman.`;

//   socket.send(message, 0, message.length, multicastPort, multicastAddress, (err) => {
//   if (err) {
//     console.error('Error sending message:', err);
//   } else {
//     console.log('Message sent successfully:', message);
//   }
// });
// }







