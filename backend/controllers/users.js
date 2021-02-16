const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('ErrorGettingUserProfile'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'ErrorGettingUserProfile') {
        res.status(404).send({ message: 'Пользователь с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID пользователя' });
        return;
      }

      res.status(500).send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      res.status(500).send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(new Error('ErrorUpdatingUserProfile'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      if (err.message === 'ErrorUpdatingUserProfile') {
        res.status(404).send({ message: 'Пользователь с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID пользователя' });
        return;
      }

      res.status(500).send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, upsert: true },
  )
    .orFail(new Error('ErrorUpdatingUserAvatar'))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      if (err.message === 'ErrorUpdatingUserAvatar') {
        res.status(404).send({ message: 'Пользователь с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID пользователя' });
        return;
      }

      res.status(500).send({ message: `Что-то пошло не так... ${err.message}` });
    });
};
