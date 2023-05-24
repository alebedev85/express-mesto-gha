const usersModel = require('../models/user');

const handelError = (err, res) => {
  console.log(err.name);
  if (err.name === 'ValidationError' || 'CastError') {
    res.status(400).send({ message: 'Переданы некорректные данные' });
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
};

const getUsers = (req, res) => {
  usersModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      handelError(err, res);
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
      res.send(user);
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
      res.send(user);
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
      res.send(user);
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
