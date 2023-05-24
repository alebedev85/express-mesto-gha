const ERRORS_STATUS = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const handelError = (err, res) => {
  if (err.message === 'Notfound') {
    res.status(ERRORS_STATUS.NOT_FOUND).send({ message: 'По запросу ничего не найдено.' });
    return;
  }
  if (err.name === 'ValidationError' || 'CastError') {
    res.status(ERRORS_STATUS.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    return;
  }
  res.status(ERRORS_STATUS.INTERNAL_ERROR).send({
    message: 'Internal Server Error',
    err: err.message,
    stack: err.stack,
  });
};

module.exports = handelError;
