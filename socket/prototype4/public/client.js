













// const socket = io();

// socket.on('message', (msg) => {
//   displayMessage(msg);
// });

// function sendMessage() {
//   const message = `Message: Hello2 from sender from aman.`;
//   socket.emit('message', message);
// }

// function displayMessage(message) {
//   const messageElement = document.createElement('div');
//   messageElement.textContent = message;
//   document.body.appendChild(messageElement);
// }




















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










//////////////////////////////////////////////////////////////////////////////////

///////////         // Construct message with count
///  const message = `Message ${messageCount}: Hello from sender from aman.`;


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






