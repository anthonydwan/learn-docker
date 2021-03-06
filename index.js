const express = require('express');
const mongoose = require('mongoose');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const {
  MONGO_IP,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USER,
} = require('./config/config');

const app = express();
// note to check the password
const MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// this way the app can run before getting
const connectWithRetry = () => {
  mongoose
    // note that mongo is name of the container which we are using to connect
    .connect(MONGO_URL)
    .then(() => console.log('successfully connected to DB'))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
app.enable('trust proxy');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h2>Hi There!</h2>');
  console.log('yeah it ran');
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

// if port is set, use it, if not, use 3000
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
