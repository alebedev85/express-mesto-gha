const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const userRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUser } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), createUser);

router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({
    message: 'Ohh you are lost, read the API documentation to find your way back home :)',
  });
});

module.exports = router;
