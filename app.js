const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');

const mongoose = require('mongoose');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const app = express();

app.use(helmet());
app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
