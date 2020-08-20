const express = require('express');
const path = require('path'); // модуль для пути
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express(); // подключаем экспресс

app.use(express.static(path.join(__dirname, 'public'))); // открыли доступ к публичной папки

app.use('/', userRouter);
app.use('/', cardsRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
