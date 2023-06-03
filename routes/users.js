const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');

router.get('/', userController.getUsers);

router.get('/me', userController.getMyUser);

router.get('/:userId', userController.getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), userController.edithUser);

router.patch('/me/avatar', userController.editAvatarhUser);

module.exports = router;
