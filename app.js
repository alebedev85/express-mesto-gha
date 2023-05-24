const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: new mongoose.Types.ObjectId('646c849a242c718d69b66694'),
  };
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(404).send({
    message: 'Ohh you are lost, read the API documentation to find your way back home :)',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
