import * as http from "http";
import { Server } from "socket.io";

const PORT = 3001;

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'], // List of allowed headers
        credentials: true, // If using cookies or Authorization headers
    },
});

// Set up the connection event
io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Handle custom events
    socket.on('notification', (data) => {
        console.log(`Notification received:`, data);
        io.emit('notification', data); // Broadcast the notification to all clients
    });

    // Handle error events
    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    // Handle client disconnection
    socket.on('disconnect', (reason) => {
        console.log(`Client disconnected: ${socket.id} (Reason: ${reason})`);
    });
});

// Make the server listen on the defined port
server.listen(PORT, () => {
	console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

export { server, io };