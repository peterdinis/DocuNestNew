"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
var socket_io_1 = require("socket.io");
var http = require("http");
var PORT = 3001;
var server = http.createServer();
exports.server = server;
var io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'], // List of allowed headers
        credentials: true, // If using cookies or Authorization headers
    },
});
exports.io = io;
// Set up the connection event
io.on('connection', function (socket) {
    console.log("New client connected: ".concat(socket.id));
    // Handle custom events
    socket.on('notification', function (data) {
        console.log("Notification received:", data);
        io.emit('notification', data); // Broadcast the notification to all clients
    });
    // Handle error events
    socket.on('error', function (error) {
        console.error('Socket error:', error);
    });
    // Handle client disconnection
    socket.on('disconnect', function (reason) {
        console.log("Client disconnected: ".concat(socket.id, " (Reason: ").concat(reason, ")"));
    });
});
// Make the server listen on the defined port
server.listen(PORT, function () {
    console.log("Socket.IO server running on http://localhost:".concat(PORT));
});
