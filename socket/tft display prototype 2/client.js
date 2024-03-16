const dgram = require('dgram');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the multicast address: ', (multicastAddress) => {
    rl.question('Enter the multicast port: ', (multicastPort) => {
        const MULTICAST_ADDRESS = multicastAddress;
        const MULTICAST_PORT = parseInt(multicastPort, 10);
        const client = dgram.createSocket('udp4');

        // Event listener for closing the client socket
        client.on('close', () => {
            console.log('UDP client disconnected');
        });

        // Event listener for error handling
        client.on('error', (err) => {
            console.error('UDP client error:', err);
            client.close(); // Close the client socket on error
        });

        // Function to send messages
        const sendMessage = () => {
            rl.question('Enter the message to send =>', (message) => {
                if (message.toLowerCase() === 'exit') {
                    client.close(); // Close the client socket if user types "exit"
                    rl.close(); // Close the readline interface
                    return;
                }

                const buffer = Buffer.from(message);

                // Send the message via multicast
                client.send(buffer, 0, buffer.length, MULTICAST_PORT, MULTICAST_ADDRESS, (err) => {
                    if (err) {
                        console.error('Error sending message:', err);
                    } else {
                        console.log(`Message "${message}" sent via multicast to ${MULTICAST_ADDRESS}:${MULTICAST_PORT}`);
                    }
                });

                // Continue sending messages recursively
                sendMessage();
            });
        };

        // Start sending messages
        sendMessage();
    });
});

























// const dgram = require('dgram');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Prompt the user for the port only once
// rl.question('Enter the port for the browser: ', (browserPort) => {
//     const HOST = 'localhost'; // Assuming the browser is running on the same host
//     const PORT = parseInt(browserPort, 10);
//     const client = dgram.createSocket('udp4');

//     // Event listener for closing the client socket
//     client.on('close', () => {
//         console.log('UDP client disconnected');
//     });

//     // Event listener for error handling
//     client.on('error', (err) => {
//         console.error('UDP client error:', err);
//         client.close(); // Close the client socket on error
//     });

//     // Function to send messages
//     const sendMessage = () => {
//         rl.question('Enter the message to send =>', (message) => {
//             if (message.toLowerCase() === 'exit') {
//                 client.close(); // Close the client socket if user types "exit"
//                 rl.close(); // Close the readline interface
//                 return;
//             }

//             const buffer = Buffer.from(message);

//             client.send(buffer, 0, buffer.length,MULTI, PORT, HOST, (err) => {
//                 if (err) {
//                     console.error('Error sending message:', err);
//                 } else {
//                     //console.log(`Message "${message}" sent to browser on port ${PORT}`);
//                 }
//             });

//             // Continue sending messages recursively
//             sendMessage();
//         });
//     };

//     // Start sending messages
//     sendMessage();
// });



















//   //  its working the text data pass perfect 

// const dgram = require('dgram');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Prompt the user for the port only once
// rl.question('Enter the port for the browser: ', (browserPort) => {
//     const HOST = 'localhost'; // Assuming the browser is running on the same host
//     const PORT = parseInt(browserPort, 10);
//     const client = dgram.createSocket('udp4');

//     // Event listener for closing the client socket
//     client.on('close', () => {
//         console.log('UDP client disconnected');
//     });

//     // Event listener for error handling
//     client.on('error', (err) => {
//         console.error('UDP client error:', err);
//         client.close(); // Close the client socket on error
//     });

//     // Function to send messages
//     const sendMessage = () => {
//         rl.question('Enter the message to send =>', (message) => {
//             if (message.toLowerCase() === 'exit') {
//                 client.close(); // Close the client socket if user types "exit"
//                 rl.close(); // Close the readline interface
//                 return;
//             }

//             const buffer = Buffer.from(message);

//             client.send(buffer, 0, buffer.length, PORT, HOST, (err) => {
//                 if (err) {
//                     console.error('Error sending message:', err);
//                 } else {
//                     //console.log(`Message "${message}" sent to browser on port ${PORT}`);
//                 }
//             });

//             // Continue sending messages recursively
//             sendMessage();
//         });
//     };

//     // Start sending messages
//     sendMessage();
// });
















// const dgram = require('dgram');
// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// // Get user input for host, port, and message
// rl.question('Enter the port for the browser: ', (browserPort) => {
//     rl.question('Enter the message to send: ', (message) => {
//         rl.close();

//         const HOST = 'localhost'; // Assuming the browser is running on the same host
//         const PORT = parseInt(browserPort, 10);

//         const client = dgram.createSocket('udp4');

//         const buffer = Buffer.from(message);

//         client.send(buffer, 0, buffer.length, PORT, HOST, (err) => {
//             if (err) {
//                 console.error('Error sending message:', err);
//             } else {
//                 console.log(buffer.length)
//                 console.log(`Message "${message}" sent to browser on port ${PORT}`);
//             }
//             client.close();
//         });
//     });
// });












// const dgram = require('dgram');

// const HOST = '0.0.0.0';
// const PORT = 30000;
// const message = new Buffer('My name is aman ');
// const client = dgram.createSocket('udp4');

// client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
//     if (err) throw err;
//     console.log('UDP message sent to ' + HOST +':'+ PORT);
//     client.close();
// });