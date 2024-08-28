module.exports = function (socket, io) {
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });
};
