const express = require('express');
const helmet = require('helmet');

const mongoose = require('mongoose');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(helmet());
app.use(express.json());

app.use(router);
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
