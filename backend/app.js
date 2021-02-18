const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.user = {
    _id: '5ffe535630e2bc02e4be2126',
  };

  next();
});

app.use('/', usersRoutes);
app.use('/', cardsRoutes);

app.post('/signin', login);
app.post('/signup', createUser);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
