const express = require('express');
const mongoose = require('mongoose');

const app = express();

// note to check the password
mongoose
  // note that mongo is name of the container which we are using to connect
  .connect('mongodb://docker_mongo:password@mongo:27017/?authSource=admin')
  .then(() => console.log('successfully connected to DB'))
  .catch((e) => console.log(e));

// if port is set, use it, if not, use 3000
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('<h2>Hi There!</h2>');
});

app.listen(port, () => console.log(`listening on port ${port}`));
