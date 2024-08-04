const path = require('path');

const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: 'config.env' });

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/roomname', (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist/room.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server running on port ${port}...`));
