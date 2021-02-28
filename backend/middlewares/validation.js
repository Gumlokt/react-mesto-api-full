/* eslint-disable newline-per-chained-call */
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

module.exports.unAuthorizedRequestsValidation = celebrate({
  body: {
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

module.exports.authorizedRequestsValidation = celebrate({
  params: {
    cardId: Joi.string().min(24).max(24).hex().messages({
      'string.min': 'Длина идентификатора карточки - 24 символа',
      'string.max': 'Длина идентификатора карточки - 24 символа',
      'string.hex': 'Идентификатор карточки - шестнадцатиричная строка',
    }),
  },
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
    link: Joi.string().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }

      return helper.message('Указан не валидный URL');
    }),
  },
});

module.exports.checkAuthHeader = celebrate({
  headers: Joi.object({
    authorization: Joi.string().required().messages({
      'any.required': 'Заголовок Authorization - обязательное поле',
    }),
  }).unknown(),
});
