const usersModel = require('../models/user');

const handelError = (err, res) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Переданы некорректные данные при создании' });
    return;
  };
  if (err.message === 'Notfound') {
    res.status(404).send({ message: 'Пользователь не найден.' });
    return;
  };
  res.status(500).send({
    message: 'Internal Server Error',
    err: err.message,
    stack: err.stack,
  });
}

const getUsers = (req, res) => {
  usersModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const getUserById = (req, res) => {
  usersModel.findById(req.params.userId)
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handelError(err, res);
    });
};

const postUser = (req, res) => {
  usersModel.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      handelError(err, res);
    });
};

const edithUser = (req, res) => {
  usersModel.findByIdAndUpdate(req.user._id, req.body, { new: true, })
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      handelError(err, res);
    });
};

const editAvatarhUser = (req, res) => {
  usersModel.findByIdAndUpdate(req.user._id, req.body, { new: true, })
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      handelError(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  edithUser,
  editAvatarhUser,
};
