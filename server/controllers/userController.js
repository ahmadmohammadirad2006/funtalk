const factory = require('./handlerFactory');
const User = require('../models/userModel');

exports.getAllUsers = factory.getAll(User);

exports.getUser = factory.getOne(User);

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);

// BE CAREFUL: This one completely deletes user data from data base 
exports.deleteUser = factory.deleteOne(User);
