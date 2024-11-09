"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = void 0;
var socket_io_1 = require("socket.io");
var http = require("http");
var PORT = process.env.SOCKET_SERVER_PORT;
var server = http.createServer();
exports.server = server;
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ['GET', 'POST'],
        allowedHeaders: [
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept',
        ],
    },
});
exports.io = io;
server.listen(3001, function () {
    console.log("Socket.IO server running on http://localhost:".concat(3001));
});
