const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const roomRouter = require('./routes/roomRouter');
const userRouter = require('./routes/userRouter');

const app = express();

// Body-parser
app.use(express.json({ limit: '10kb' }));

// Cookie-parser
app.use(cookieParser());

// Serve static files in ../client/dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routers
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);

// Pages
app.get('/rooms/roomname', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/room.html'));
});

// handle undefined routes
app.all('*', (req, res, next) => {
  if (req.url.startsWith('/api'))
    return next(new AppError(`Can't find ${req.url} on this server!`, 404));
  res
    .status(404)
    .sendFile(path.join(__dirname, '../client/dist', 'not-found.html'));
});

// handler errors
app.use(globalErrorHandler);

module.exports = app;
