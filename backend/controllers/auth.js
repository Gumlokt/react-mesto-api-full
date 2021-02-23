const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { BadRequestError, ConflictError } = require('../errors');

module.exports.createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(
          'Пользователь с указанным E-Mail уже зарегистрирован',
        );
      }

      bcrypt
        .hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          });
        })
        .then((user) => res.status(200).send({ data: user }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(
              new BadRequestError(
                `Введенные данные не прошли валидацию: ${err.message}`,
              ),
            );
          }

          next(err);
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // do not forget to place MY-SECRET-KEY to apropriate function call in auth.js
      const token = jwt.sign({ _id: user._id }, 'MY-SECRET-KEY', {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch(next);
};
