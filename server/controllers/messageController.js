const factory = require('./handlerFactory');
const Message = require('../models/messageModel');

exports.deleteMessage = factory.deleteOne(Message);
exports.updateMessage = factory.updateOne(Message);
exports.createMessage = factory.createOne(Message, [
  { path: 'room', select: 'name' },
  { path: 'user', select: 'name email emoji' },
]);
exports.getAllMessages = factory.getAll(Message);
exports.getMessage = factory.getOne(Message);

// this unables user to set the createdAt field and sets user field to the current user's id
exports.filterBody = (req, res, next) => {
  req.body = {
    content: req.body.content,
    user: req.user._id,
    room: req.body.room,
  };
  next();
};
