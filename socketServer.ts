import { Server } from 'socket.io';
import * as http from 'http';

const PORT = 3001;

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        ],
    },
});

// Set up the connection event
io.on('connection', (socket) => {
    console.log('New client connected', socket.id);

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);
    });
});

// Make the server listen on the defined port
server.listen(PORT, () => {
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

export { server, io };
