const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { login, createUser } = require('./controllers/auth');

const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const validation = require('./middlewares/validation');

const { NotFoundError } = require('./errors');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/signin', validation, login);
app.post('/signup', validation, createUser);

// всем остальным роутам идущим ниже требуется авторизация
app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
