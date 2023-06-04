const { celebrate, Joi } = require('celebrate');

const validateUserBady = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https*:\/\/.*/),
  }).unknown(true),
});

module.exports = {
  validateUserBady,
};
