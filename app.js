const express = require('express');
const helmet = require('helmet');

const mongoose = require('mongoose');
const router = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('646c77bd5221449462a62c29'),
  };
  next();
});

app.use(router);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
