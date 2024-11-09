import { Server } from 'socket.io';
import * as http from 'http';
import * as dotenv from "dotenv";

dotenv.config()

const PORT = process.env.SOCKET_SERVER_PORT;

const server = http.createServer();

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        ],
    },
});

server.listen(3001, () => {
    console.log(`Socket.IO server running on http://localhost:${3001}`);
});

export { server, io };
