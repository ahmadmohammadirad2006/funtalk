const path = require('path');

exports.getHome = function (req, res, next) {
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/index.html'));
};

exports.getLogin = function (req, res, next) {
  if (req.user) {
    return res.redirect('/home');
  }
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/log-in.html'));
};

exports.getSignup = function (req, res, next) {
  if (req.user) {
    return res.redirect('/home');
  }
  res
    .status(200)
    .sendFile(path.join(__dirname, '../../client/dist/sign-up.html'));
};

exports.getRooms = function (req, res, next) {
  if (req.user) {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../../client/dist/rooms.html'));
  }
  res.redirect('/login');
};

exports.getProfile = function (req, res, next) {
  if (req.user) {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../../client/dist/profile.html'));
  }
  res.redirect('/login');
};

exports.getChat = function (req, res, next) {
  if (req.user) {
    return res
      .status(200)
      .sendFile(path.join(__dirname, '../../client/dist/chat.html'));
  }
  res.redirect('/login');
};
