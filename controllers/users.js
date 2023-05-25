const usersModel = require('../models/user');
const handleError = require('../utils/handleError');

const getUsers = (req, res) => {
  usersModel.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      handleError(err, res);
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
      handleError(err, res);
    });
};

const postUser = (req, res) => {
  usersModel.create(req.body)
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const edithUser = (req, res) => {
  usersModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const editAvatarhUser = (req, res) => {
  usersModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  getUsers,
  getUserById,
  postUser,
  edithUser,
  editAvatarhUser,
};
