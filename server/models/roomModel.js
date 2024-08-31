const mongoose = require('mongoose');
const emojiRegex = require('emoji-regex');

// FUNCTIONS

const isOneEmoji = function (emoji) {
  const regex = emojiRegex();

  const result = regex.exec(emoji);

  if (result !== null) {
    return emoji === result[0];
  } else {
    return false;
  }
};

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A room must have a name'],
      unique: true,
      minlength: [4, 'Room name must be atleast 4 characters'],
      maxlength: [12, "Room name mustn't be more than 12 characters"],
    },
    description: {
      type: String,
      required: [true, 'A room must have a description'],
      minlength: [30, 'Description must be atleast 30 characters'],
      maxlength: [90, 'Description must not be more than 90 characters'],
    },
    emoji: {
      type: String,
      required: [true, 'A room must have a emoji'],
      validate: {
        validator: isOneEmoji,
        message: 'Please provide exactly one emoji',
      },
    },
    currentUsers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

roomSchema.virtual('messages', {
  ref: 'Message',
  localField: '_id',
  foreignField: 'room',
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
