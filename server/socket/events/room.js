const Room = require('../../models/roomModel');

const isUserInRoom = function (io, roomId, userId) {
  // Get the room object from the io instance
  const room = io.sockets.adapter.rooms.get(roomId);

  // If the room doesn't exist or is empty, return false
  if (!room) {
    return false;
  }

  // Iterate through the sockets in the room
  for (let socketId of room) {
    const socket = io.sockets.sockets.get(socketId);
    // Check if the socket has a user object and if the ID matches
    if (socket?.user?._id.toString() === userId.toString()) {
      return true; // User is in the room
    }
  }

  return false; // User is not in the room
};

module.exports = function (socket, io) {
  socket.on('join-room', async (roomId) => {
    if (!isUserInRoom(io, roomId, socket.user._id)) {
      const user = {
        _id: socket.user._id,
        name: socket.user.name,
        emoji: socket.user.emoji,
      };
      socket.to(roomId).emit('one-joined', user);
      await Room.findByIdAndUpdate(roomId, {
        $push: { currentUsers: socket.user },
      });
    }
    socket.join(roomId);
    socket.currentRoom = roomId;
  });

  socket.on('disconnect', async () => {
    if (!isUserInRoom(io, socket.currentRoom, socket.user._id)) {
      const user = {
        _id: socket.user._id,
        name: socket.user.name,
        emoji: socket.user.emoji,
      };
      socket.to(socket.currentRoom).emit('one-left', user);
      await Room.findByIdAndUpdate(socket.currentRoom, {
        $pull: { currentUsers: socket.user._id },
      });
    }
    socket.leave(socket.currentRoom);
    socket.currentRoom = null;
  });
};
