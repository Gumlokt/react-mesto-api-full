const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const cors = require('cors');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { login, createUser } = require('./controllers/auth');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validation = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NotFoundError } = require('./errors');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;
const app = express();

// app.use(cors());
// app.options('*', cors());

app.options('*', (req, res) => {
  res.set(
    'Access-Control-Allow-Origin',
    'http://gumlokt.students.nomoreparties.space',
  );
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send('ok');
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Origin, Authorization',
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  );

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// логгер запросов
app.use(requestLogger);

app.post('/signin', validation, login);
app.post('/signup', validation, createUser);

// всем остальным роутам идущим ниже требуется авторизация
app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// логгер ошибок
app.use(errorLogger);

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
