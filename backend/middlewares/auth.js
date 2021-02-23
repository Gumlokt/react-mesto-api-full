const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError'); // 401 - что-то не так при аутентификации или авторизации

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(
      'Необходима авторизация. Отсутствует заголовок Authorization.',
    );
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // do not forget to place MY-SECRET-KEY to apropriate function call in users.js
    payload = jwt.verify(token, 'MY-SECRET-KEY');
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация. Неверный token.');
  }

  req.user = payload;

  next();
};
