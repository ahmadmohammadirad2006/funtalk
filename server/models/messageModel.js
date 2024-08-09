const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A message must have a content'],
    minlength: 1,
    maxlength: 255,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: [true, 'A message must belong to a room'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'A message must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

messageSchema.pre(/^find/, function (next) {
  this.populate([
    { path: 'room', select: 'name' },
    { path: 'user', select: 'name email emoji' },
  ]);
  next();
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
