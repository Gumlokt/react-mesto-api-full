const BadRequestError = require('./BadRequestError'); // 400 - с запросом что-то не так
const UnauthorizedError = require('./UnauthorizedError'); // 401 - что-то не так при аутентификации или авторизации
const ForbiddenError = require('./ForbiddenError'); // 403 - пользователю нельзя удалять чужие карточки
const NotFoundError = require('./NotFoundError'); // 404 - не найден ресурс по переданному _id
const ConflictError = require('./ConflictError'); // 409 - регистрация не выполнена, т.к. пользователь с указанным E-Mail-ом уже зареген

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
};
