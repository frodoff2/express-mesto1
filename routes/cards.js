const express = require('express');

const router = express.Router();
const path = require('path');
const fsPromise = require('fs').promises;

const userPath = path.join(__dirname, '..', 'data', 'cards.json');

router.get('/cards', (req, res) => {
  fsPromise.readFile(userPath, { encoding: 'utf8' })
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch(() => res
      .status(500)
      .send('Ошибка'));
});

router.get('/cards/:id', (req, res) => {
  fsPromise.readFile(userPath, { encoding: 'utf8' })
    .then((data) => {
      // eslint-disable-next-line no-underscore-dangle
      const info = JSON.parse(data).find((owner) => owner._id === req.params.id);
      if (info) {
        return res
          .status(200)
          .send(info);
      }
      return res
        .status(404)
        .send({ message: 'нет такого id' });
    })
    .catch(() => res
      .status(500)
      .send({ message: 'Ошибка' }));
});

router.get('*', (req, res) => {
  res
    .status(404)
    .send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
