const express = require('express');
const path = require('path'); // модуль для пути
const mongoose = require('mongoose'); // модуль для монго
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express(); // подключаем экспресс

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '5f4e784ef13dfe9c69c26b47',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use(express.static(path.join(__dirname, 'public'))); // открыли доступ к публичной папки

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
