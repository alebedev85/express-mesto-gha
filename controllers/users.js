const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usersModel = require('../models/user');

// Errors
const BadEmailError = require('../errors/bad-email-err');
const BadRequestError = require('../errors/bad-request-err');
const HaveNoRightError = require('../errors/have-no-right');
const NotFoundError = require('../errors/not-found-err');

const handleError = require('../utils/handleError');

const getUsers = (req, res, next) => {
  usersModel.find({})
    .orFail(() => {
      throw new NotFoundError('По запросу ничего не найдено');
    })
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  usersModel.findById(req.params.userId)
    .orFail(() => {
      throw new NotFoundError('По запросу ничего не найдено');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const getMyUser = (req, res, next) => {
  usersModel.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('По запросу ничего не найдено');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

/**
 *Функция регистрации нового пользователя, принимет данные пользователя,
  хеширует и сохраняет хешированный пароль
 * @param {*} req
 * @param {*} res
 * @returns оюъект с токеном токен
 */
const createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => usersModel.create({
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new BadEmailError('Такой email уже используется'));
      }
      return next();
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

/**
 *Функция авторизации, принимает email и пороль,
  ищет пользователя по email, проверяет пороль и генерирует токен
 * @param {*} req
 * @param {*} res
 * @returns оюъект с токеном токен
 */
const login = (req, res) => {
  const { email, password } = req.body;

  usersModel.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getMyUser,
  getUserById,
  createUser,
  edithUser,
  editAvatarhUser,
  login,
};
