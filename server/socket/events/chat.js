module.exports = function (socket, io) {
  socket.on('send-message', (message) => {
    const sanatizedMessage = {
      content: message.content,
      room: message.room,
      user: socket.user,
      createdAt: new Date(Date.now()),
    };
    socket
      .to(sanatizedMessage.room._id)
      .emit('receive-message', sanatizedMessage);
  });
};
