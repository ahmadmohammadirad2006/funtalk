const factory = require('./handlerFactory');
const Room = require('../models/roomModel');

exports.deleteRoom = factory.deleteOne(Room);
exports.updateRoom = factory.updateOne(Room);
exports.createRoom = factory.createOne(Room);
exports.getAllRooms = factory.getAll(Room);
exports.getRoom = factory.getOne(Room);

// this unables user to set the createdAt field and sets createdBy field to the current user's id
exports.filterBody = (req, res, next) => {
  req.body = {
    name: req.body.name,
    description: req.body.description,
    emoji: req.body.emoji,
  };
  next();
};
