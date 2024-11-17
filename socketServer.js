Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
var socket_io_1 = require("socket.io");
var http = require("http");
var PORT = 3001;
var server = http.createServer();
exports.server = server;
var io = new socket_io_1.Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
		allowedHeaders: [
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept",
		],
	},
});
exports.io = io;
// Set up the connection event
io.on("connection", (socket) => {
	console.log("New client connected", socket.id);
	socket.on("error", (error) => {
		console.error("Socket error:", error);
	});
	socket.on("disconnect", () => {
		console.log("Client disconnected", socket.id);
	});
});
// Make the server listen on the defined port
server.listen(PORT, () => {
	console.log("Socket.IO server running on http://localhost:".concat(PORT));
});
