const usersModel = require('../models/user');

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
      if (err.message === 'Notfound') {
        res.status(404).send({ message: 'User not found' });
        return;
      };
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const postUser = (req, res) => {
  usersModel.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const edithUser = (req, res) => {
  usersModel.findByIdAndUpdate(req.user._id, req.body, {new: true,})
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(404).send({ message: 'User not found' });
        return;
      };
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const editAvatarhUser = (req, res) => {
  usersModel.findByIdAndUpdate(req.user._id, req.body, {new: true,})
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(404).send({ message: 'User not found' });
        return;
      };
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  edithUser,
  editAvatarhUser,
};
