const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A room must have a name'],
    unique: true,
    minlength: [4, 'Room name must be atleast 4 characters'],
    maxlength: [12, "Room name mustn't be more than 12 characters"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A room must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
