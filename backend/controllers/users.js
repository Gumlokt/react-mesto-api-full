const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { BadRequestError, NotFoundError } = require('../errors');

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFoundError('Пользователь с указанным ID отсутствует'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Указан не валидный ID пользователя'));
      }

      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { name, about, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      console.log(hash);

      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      }).orFail(new Error('Ошибка при работе с базой данных...'));
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
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch(next);
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(new NotFoundError('Пользователь с указанным ID отсутствует'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `Введенные данные не прошли валидацию: ${err.message}`,
          ),
        );
      }

      if (err.name === 'CastError') {
        next(new BadRequestError('Указан не валидный ID пользователя'));
      }

      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(new NotFoundError('Пользователь с указанным ID отсутствует'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `Введенные данные не прошли валидацию: ${err.message}`,
          ),
        );
      }

      if (err.name === 'CastError') {
        next(new BadRequestError('Указан не валидный ID пользователя'));
      }

      next(err);
    });
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
