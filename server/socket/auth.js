const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { promisify } = require('util');
const AppError = require('../utils/appError');

const authenticateSocket = async function (socket, next) {
  try {
    let token;
    const cookieString = socket.request.headers.cookie;

    // 1) Getting token and check if it's there
    if (
      socket.request.headers.authorization &&
      socket.request.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (cookieString.split('=')[1]) {
      // THIS ONLY WORKS WHEN THERE IS JUST ONE COOKIE VALUE AND THAT IS JWT (TEMP)
      token = cookieString.split('=')[1];
    }

    if (!token) {
      return next(
        new AppError("You're not logged in! Please log in to get access.", 401)
      );
    }

    // 2) Varification token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exists.',
          401
        )
      );
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError(
          'User recently changed password! Please log in again.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    socket.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authenticateSocket };
