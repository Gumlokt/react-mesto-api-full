const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error'); // 404 error
const BadRequestError = require('../errors/bad-request-error'); // 400 error

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('ErrorGettingUserProfile'))
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'ErrorGettingUserProfile') {
        // res
        //   .status(404)
        //   .send({ message: 'Пользователь с указанным ID отсутствует' });
        // return;
        throw new NotFoundError('Пользователь с указанным ID отсутствует');
      }

      if (err.name === 'CastError') {
        // res.status(400).send({ message: 'Указан не валидный ID пользователя' });
        // return;
        throw new BadRequestError('Указан не валидный ID пользователя');
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

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
        res
          .status(400)
          .send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.getUserProfile = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
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
        res
          .status(400)
          .send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      if (err.message === 'ErrorUpdatingUserProfile') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID пользователя' });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
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
        res
          .status(400)
          .send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      if (err.message === 'ErrorUpdatingUserAvatar') {
        res
          .status(404)
          .send({ message: 'Пользователь с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID пользователя' });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'MY-SECRET-KEY', {
        expiresIn: '7d',
      });
      res.status(200).send({ token });
    })
    .catch((err) => {
      // Если пришел Promise.reject, значит пользователь не аутентифицировался
      res.status(401).send({ message: err.message });
    });

  // User.findOne({ email })
  //   .then((user) => {
  //     if (!user) {
  //       return Promise.reject(new Error('Неправильные E-Mail или пароль'));
  //     }

  //     // пользователь найден
  //     return bcrypt.compare(password, user.password);
  //   })
  //   .then((matched) => {
  //     if (!matched) {
  //       // хеши не совпали — отклоняем промис
  //       return Promise.reject(new Error('Неправильные E-Mail или пароль'));
  //     }

  //     // аутентификация успешна
  //     // создать JWT сроком на неделю и в пейлоуд токена записать
  //     // свойство _id, содержащее идентификатор пользователя:
  //     // { _id: "d285e3dceed844f902650f40" }
  //     res.send({ message: 'Всё верно!' });
  //   })
  //   .catch((err) => {
  //     // возвращаем ошибку аутентификации
  //     res.status(401).send({ message: err.message });
  //   });
};
