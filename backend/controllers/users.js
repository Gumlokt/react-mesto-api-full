const User = require('../models/user');

const { BadRequestError, NotFoundError } = require('../errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(
      new NotFoundError('Пользователь с указанным ID отсутствует (getProfile)'),
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(
          new BadRequestError(
            'Указан не валидный ID пользователя (getProfile)',
          ),
        );
      }

      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(new NotFoundError('Пользователь с указанным ID отсутствует'))
    .then((user) => res.status(200).send(user))
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
    .then((user) => res.status(200).send(user))
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
