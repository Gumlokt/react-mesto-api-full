const { CelebrateError } = require('celebrate');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    const {
      details: [errorDetails],
    } = err.details.get([...err.details.keys()][0]);

    res.status(400).send({ message: errorDetails.message });
    return;
  }

  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? `Ошибка сервера: ${message}` : message,
  });
};

module.exports = errorHandler;
