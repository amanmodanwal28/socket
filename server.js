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

 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


io.on('connection', (socket) => {
    console.log('A user connected');
    // Function to emit message when a client connects
    function emitMessage() {
        const staticMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text
        const marqueMessage = "aman modanwal"; // Marque text
         // Read image files from the uploads folder
    fs.readdir(mediaFolder, (err, files) => {
        if (err) {
            console.error('Error reading images directory:', err);
            return;
        }
        const mediaUrls = files.map(file => `/uploads/${file}`);
        // console.log(mediaUrls)
        const message = { staticMessage, marqueMessage, mediaUrls };
        io.emit('message', message);
    });
    }
    // Emit message when a client connects
    emitMessage();

    // Handle request to preload media files
    socket.on('preloadMedia', emitMessage);

    // Handle request for a new message
    socket.on('requestMessage', () => {
        emitMessage(); // Emit a new message to start the loop again
    });
    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(port,  () => {
    console.log(`Server is running on port ${port}`);
    console.log(`http://localhost:${port}`);
});









// <!-- video show but not work in autoplay   working .. -->



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const fs = require('fs');
// const path = require('path');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);
// const status = require("express-status-monitor")

// const port = 5000;
// const mediaFolder = path.join(__dirname, 'uploads');


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(status());


// io.on('connection', (socket) => {
//     console.log('A user connected');
//     // Function to emit message when a client connects
//     function emitMessage() {
//         const staticMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text
//         const marqueMessage = "aman modanwal"; // Marque text
//          // Read image files from the uploads folder
//     fs.readdir(mediaFolder, (err, files) => {
//         if (err) {
//             console.error('Error reading images directory:', err);
//             return;
//         }
//         const mediaUrls = files.map(file => `/uploads/${file}`);
//         const message = { staticMessage, marqueMessage, mediaUrls };
//         io.emit('message', message);
//     });
//     }
//     // Emit message when a client connects
//     emitMessage();
//     // Handle request for a new message
// socket.on('requestMessage', () => {
//     emitMessage(); // Emit a new message to start the loop again
// });
//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });


// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });


















// <!-- // //  video show perfectly now i need to chunk video because they take  many time to load  -->
//  the data store perfectly but in video some issue then i use the chunk file scrollBehavior: 

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


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// io.on('connection', (socket) => {
//     console.log('A user connected');
//     // Function to emit message when a client connects
//     function emitMessage() {
//         const staticMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text
//         const marqueMessage = "aman modanwal"; // Marque text
//          // Read image files from the uploads folder
//     fs.readdir(mediaFolder, (err, files) => {
//         if (err) {
//             console.error('Error reading images directory:', err);
//             return;
//         }
//         const mediaUrls = files.map(file => `/uploads/${file}`);
//         const message = { staticMessage, marqueMessage, mediaUrls };
//         io.emit('message', message);
//     });
//     }
//     // Emit message when a client connects
//     emitMessage();
//     // Handle request for a new message
// socket.on('requestMessage', () => {
//     emitMessage(); // Emit a new message to start the loop again
// });
//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });


// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });







// // <!-- ///// work perfectly   for image and text   now check  only for video  -->


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


// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Endpoint to serve image URLs from the "uploads" folder
// app.get('/media', (req, res) => {
//     fs.readdir(mediaFolder, (err, files) => {
//         if (err) {
//             console.error('Error reading images directory:', err);
//             res.status(500).send('Error reading images directory');
//             return;
//         }
//         const mediaUrls = files.map(file => `/uploads/${file}`);
//         res.json(mediaUrls);
//         console.log(mediaUrls)
//     });
// });


// io.on('connection', (socket) => {
//     console.log('A user connected');
//     // Function to emit message when a client connects
//     function emitMessage() {
//         const staticMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text
//         const marqueMessage = "aman modanwal"; // Marque text
//          // Read image files from the uploads folder
//     fs.readdir(mediaFolder, (err, files) => {
//         if (err) {
//             console.error('Error reading images directory:', err);
//             return;
//         }
//         const imageUrls = files.map(file => `/uploads/${file}`);
//         const message = { staticMessage, marqueMessage, imageUrls };
//         io.emit('message', message);
//     });
//     }
//     // Emit message when a client connects
//     emitMessage();
//     // Handle request for a new message
// socket.on('requestMessage', () => {
//     emitMessage(); // Emit a new message to start the loop again
// });
//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });


// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });







// <!-- // perfectly working  but the issue is  they work only for text not for images //-->

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

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// // Serve static files from the 'uploads' directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Endpoint to serve image URLs from the "uploads" folder
// app.get('/media', (req, res) => {
//     fs.readdir(mediaFolder, (err, files) => {
//         if (err) {
//             console.error('Error reading images directory:', err);
//             res.status(500).send('Error reading images directory');
//             return;
//         }
//         const mediaUrls = files.map(file => `/uploads/${file}`);
//         res.json(mediaUrls);
//     });
// });

// io.on('connection', (socket) => {
//     console.log('A user connected');

//     // Function to emit message when a client connects
//     function emitMessage() {
//         const staticMessage = "PPS INTERNATIONAL AND PT COMMUNICATION"; // Static text
//         const marqueMessage = "aman modanwal"; // Marque text
//         const message = { staticMessage, marqueMessage };
//         io.emit('message', message);
//     }

//     // Emit message when a client connects
//     emitMessage();

//     // Handle request for a new message
// socket.on('requestMessage', () => {
//     emitMessage(); // Emit a new message to start the loop again
// });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// });

// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//     console.log(`http://localhost:${port}`);
// });
