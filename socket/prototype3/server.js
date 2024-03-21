var PORT = 5007;
var MULTICAST_ADDR = '239.255.10.10'; // Multicast address within site-local scope

var dgram = require('dgram');
var server = dgram.createSocket({ type: 'udp4', reuseAddr: true });

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
    server.addMembership(MULTICAST_ADDR);
});

server.on('message', function (message, remote) {
    console.log('Received message from client: ' + message.toString());
    console.log('From: ' + remote.address + ':' + remote.port);
});

server.bind(PORT);










// // server.js
// var PORT = 5007;
// var HOST = '192.168.10.54'; // Example IP address of the Wi-Fi interface

// var dgram = require('dgram');
// var server = dgram.createSocket("udp4");

// server.on('listening', function () {
//     var address = server.address();
//     console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });

// server.on('message', function (message, remote) {
//     console.log('Received message from ' + remote.address + ':' + remote.port + ' - ' + message.toString());
// });

// server.bind(PORT);











// var news = [
//     "Borussia ",
//     "Tornado warning",
//     "More weekend",
//     "Android ",
//     "iPad2 out",
//     "Nation's"
// ];

// var dgram = require('dgram');
// var server = dgram.createSocket("udp4");


// server.bind(function () {
//     server.setBroadcast(true)
//     server.setMulticastTTL(128);
//     server.addMembership('239.255.255.252');
//     setInterval(broadcastNew, 2000);
// });

// function broadcastNew() {
//     var message = new Buffer.from(news[Math.floor(Math.random() * news.length)]);
//     server.send(message, 0, message.length, 5007, "239.255.255.252");
//     console.log(" ")
//     console.log("Sent => " + message + " .");
// }