const path = require('path');

const dotenv = require('dotenv');
const mongoose = require('mongoose');

// handler any uncaught exception
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// import config.env file into variables environment
dotenv.config({ path: path.join(__dirname, 'config.env') });

const app = require('./app');

// store the connection string with the password in a variable
const dbConnStr = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// connect to database
mongoose.connect(dbConnStr).then(() => {
  console.log('DB successfully connected');
});

// store port in a variable
const port = process.env.PORT || 8080;

// listen for requests
const server = app.listen(port, () =>
  console.log(`Server running on port ${port}...`)
);

// handle any unhandled rejection
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
