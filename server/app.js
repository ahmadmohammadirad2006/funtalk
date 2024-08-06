const path = require('path');

const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

// Body-parser
app.use(express.json({ limit: '10kb' }));

// Serve static files in ../client/dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/roomname', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/room.html'));
});

// handle undefined routes
app.all('*', (req, res, next) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, '../client/dist', 'not-found.html'));
  // next(new AppError(`Can't find ${req.url} on this server!`, 404));
});

// handler errors
app.use(globalErrorHandler);

module.exports = app;
