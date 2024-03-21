var PORT = 5007;
var MULTICAST_ADDR = '239.255.10.10'; // Multicast address within site-local scope
var WIFI_INTERFACE_ADDR = '192.168.10.54'; // WiFi interface address

var dgram = require('dgram');
var client = dgram.createSocket({ type: 'udp4', reuseAddr: true });

var message = Buffer.from('Hello from multicast client!');

function sendMessage() {
    client.send(message, 0, message.length, PORT, MULTICAST_ADDR, function (err) {
        if (err) throw err;
        console.log(`Message sent to ${MULTICAST_ADDR}`);
    });
}

// Send message initially
sendMessage();

// Send message every two seconds
setInterval(sendMessage, 2000);

client.on('message', function (message, remote) {
    console.log('Received response from server: ' + message.toString());
});

client.on('listening', function () {
    var address = client.address();
    console.log('Multicast UDP Client listening on ' + address.address + ":" + address.port);
    client.setMulticastTTL(128);
    client.addMembership(MULTICAST_ADDR, WIFI_INTERFACE_ADDR); // Specify the network interface for the membership
});








// // client.js
// var PORT = 5007;
// var HOST = '192.168.10.54'; // Example IP address of the Wi-Fi interface

// var dgram = require('dgram');
// var client = dgram.createSocket('udp4');

// var message = Buffer.from('Hello from client!');

// client.send(message, 0, message.length, PORT, HOST, function (err) {
//     if (err) throw err;
//     console.log('Message sent to server!');
    
// });

// client.on('message', function (message, remote) {
//     console.log('Received response from server: ' + message.toString());
// });


// client.on('listening', function () {
//     var address = client.address();
//     console.log('UDP Client listening on ' + address.address + ":" + address.port);
// });










// var PORT = 5007;
// var dgram = require('dgram');

// // var client = dgram.createSocket({ type: 'udp4', reuseAddr: true })
// var client = dgram.createSocket('udp4')
// var HOST = '192.168.10.54'; //this is your own IP

// client.on('listening', function () {
//     var address = client.address();
//     console.log('UDP Client listening on ' + address.address + ":" + address.port);
//     client.setBroadcast(true)
//     client.setMulticastTTL(128);
//     client.addMembership('239.255.255.252');
// });

// client.on('message', function (message, remote) {
//     console.log(' ');
//     console.log('From: ' + remote.address + ':' + remote.port + ' - ' + message);
// });


// client.bind(PORT);