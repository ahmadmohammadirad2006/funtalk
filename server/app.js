const path = require('path');

const express = require('express');
const cookieParser = require('cookie-parser');
const { rateLimit } = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const roomRouter = require('./routes/roomRouter');
const userRouter = require('./routes/userRouter');
const messageRouter = require('./routes/messageRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();

// Limit requests per hour for each IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 1 hour).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
app.use('/api', limiter);

// Set security HTTP headers
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", 'https://unpkg.com'],
      imgSrc: ["'self'", 'data:', 'https://unpkg.com'],
      connectSrc: ["'self'", 'https://unpkg.com'],
    },
  })
);

// Prevent HTTP Parameter Pollution
app.use(
  hpp({
    whitelist: [
      'name',
      'emoji',
      'createdAt',
      'content',
      'room',
      'user',
      'role',
      'name',
      'email',
    ],
  })
);

// Prevent .html files from being served as static files by their name
app.use((req, res, next) => {
  if (req.url.endsWith('.html')) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, '../client/dist', 'not-found.html'));
  }
  next();
});

// Body-parser
app.use(express.json({ limit: '10kb' }));

// Cookie-parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Compress the response
app.use(compression());

// Serve static files in ../client/dist folder
app.use(express.static(path.join(__dirname, '../client/dist')));

// Routers

// API
app.use('/api/rooms', roomRouter);
app.use('/api/users', userRouter);
app.use('/api/messages', messageRouter);

// VIEW
app.use('/', viewRouter);

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
