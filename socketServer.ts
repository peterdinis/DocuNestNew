import * as http from "http";
import { Server } from "socket.io";

const PORT = process.env.SOCKET_SERVER_PORT;

const server = http.createServer();

const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL,
		methods: ["GET", "POST"],
		allowedHeaders: [
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept",
		],
	},
});

server.listen(PORT, () => {
	console.log(`Socket.IO server running on http://localhost:${PORT}`);
});

export { server, io };
