const BadRequestError = require('./BadRequestError'); // 400 - с запросом что-то не так
const UnauthorizedError = require('./UnauthorizedError'); // 401 - что-то не так при аутентификации или авторизации
const NotFoundError = require('./NotFoundError'); // 404 - не найден ресурс по переданному _id

module.exports = { BadRequestError, UnauthorizedError, NotFoundError };
