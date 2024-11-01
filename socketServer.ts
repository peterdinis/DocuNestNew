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

server.listen(PORT, () => {
    console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

export { server, io };
