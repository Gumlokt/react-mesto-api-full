/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const validation = celebrate({
  body: {
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле Имя должно быть миниммум 2 символа',
      'string.max': 'Поле Имя должно быть максимум 30 символа',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.min': 'Поле Деятельность должно быть миниммум 2 символа',
      'string.max': 'Поле Деятельность должно быть максимум 30 символа',
    }),
    avatar: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message('Указан не валидный URL');
    }),
    password: Joi.string().min(3).required().messages({
      'string.min': 'Пароль должен быть длиной не менее 3 символов',
      'any.required': 'Пароль - обязательное поле',
    }),
    email: Joi.string()
      .required()
      .custom((value, helper) => {
        if (validator.isEmail(value)) {
          return value;
        }

        return helper.message('Указан не валидный E-Mail');
      })
      .messages({
        'any.required': 'E-Mail - обязательное поле',
      }),
  },
});

module.exports = validation;
