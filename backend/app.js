const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { login, createUser } = require('./controllers/auth');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const {
  unAuthorizedRequestsValidation,
  checkAuthHeader,
} = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NotFoundError } = require('./errors');
const { allowedCors, DEFAULT_PORT } = require('./config');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = DEFAULT_PORT } = process.env;
const app = express();

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

app.use(helmet());
app.disable('x-powered-by');

app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.send('ok');
});

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Origin, Authorization',
    );
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// логгер запросов
app.use(requestLogger);

// for crash-test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', unAuthorizedRequestsValidation, login);
app.post('/signup', unAuthorizedRequestsValidation, createUser);

// всем остальным роутам идущим ниже требуется авторизация
app.use('/', checkAuthHeader, auth, usersRoutes);
app.use('/', checkAuthHeader, auth, cardsRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// логгер ошибок
app.use(errorLogger);

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
