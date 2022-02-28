const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} = require('./config/config');

const app = express();

// note to check the password
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;
mongoose
  // note that mongo is name of the container which we are using to connect
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('successfully connected to DB'))
  .catch((e) => console.log(e));

// if port is set, use it, if not, use 3000
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h2>Hi There!</h2>');
});

app.listen(port, () => console.log(`listening on port ${port}`));
