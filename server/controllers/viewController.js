const path = require('path');

exports.getHome = function (req, res, next) {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/index.html'));
};

exports.getLogin = function (req, res, next) {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/log-in.html'));
};

exports.getSignup = function (req, res, next) {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/sign-up.html'));
};

exports.getRooms = function (req, res, next) {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/rooms.html'));
};

exports.getProfile = function (req, res, next) {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/profile.html'));
};

exports.getChat = function (req, res, next) {
  res.status(200).sendFile(path.join(__dirname, '../../client/dist/chat.html'));
};
