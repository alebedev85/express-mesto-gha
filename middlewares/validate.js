const { celebrate, Joi } = require('celebrate');

const validateUserBady = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().pattern(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https*:\/\/[A-Z0-9-._~:/?#[\]@!$&'()*+,;=]+/i),
  }).unknown(true),
});

const validateCardBady = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https*:\/\/[A-Z0-9-._~:/?#[\]@!$&'()*+,;=]+/i),
  }).unknown(true),
});

module.exports = {
  validateUserBady,
  validateCardBady,
};
