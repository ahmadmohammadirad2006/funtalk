const { Server } = require('socket.io');
const { authenticateSocket } = require('./auth.js');
const roomEvents = require('./events/room');
const chatEvents = require('./events/chat');

let io;

const initSocket = function (httpServer) {
  // create io server
  io = new Server(httpServer);

  // Middlewares
  io.use(authenticateSocket);

  io.on('connection', (socket) => {
    // Register event listeners
    roomEvents(socket, io);
    chatEvents(socket, io);
  });
};

module.exports = { initSocket, io };
