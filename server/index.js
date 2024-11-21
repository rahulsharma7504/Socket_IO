const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // React App URL
        methods: ["GET", "POST"]
    }
});

app.use(cors());

// Socket.IO connection handling
const admin=io.of('/admin')
admin.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("joinRoom",(room)=>{
        socket.join(room);
        console.log(`User joined room ${room}`);
    })
    // Socket. socket

    socket.on('message', (data) => {
        console.log(data);
    socket.to(data.id).emit('message',data.message);  

    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  