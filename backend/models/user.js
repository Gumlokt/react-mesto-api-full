const mongoose = require('mongoose');
const stringValidator = require('validator');
const bcrypt = require('bcryptjs');

const { UnauthorizedError } = require('../errors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]{1,}/i.test(
          v,
        );
      },
      message: 'Не корректный URL',
    },
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return stringValidator.isEmail(v);
      },
      message: 'Не корректный E-Mail',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // this будет являться экземпляром модели User, создаваемым в controllers/users.js
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Неправильные E-Mail или пароль'),
        );
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Неправильные E-Mail или пароль'),
          );
        }

        return user; // но переменной user нет в этой области видимости
      });
    });
};

module.exports = mongoose.model('user', userSchema);
