const express = require('express');

const router = express.Router();
const path = require('path');
const fsPromise = require('fs').promises;

const userPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/users', (req, res) => {
  fsPromise.readFile(userPath, { encoding: 'utf8' })
    .then((data) => res
      .status(200)
      .send(JSON.parse(data)))
    .catch(() => res
      .status(500)
      .send('Ошибка'));
});

router.get('/users/:id', (req, res) => {
  fsPromise.readFile(userPath, { encoding: 'utf8' })
    .then((data) => {
      // eslint-disable-next-line no-underscore-dangle
      const user = JSON.parse(data).find((owner) => owner._id === req.params.id);
      if (user) {
        return res
          .status(200)
          .send(user);
      }
      return res
        .status(404)
        .send({ message: 'нет такого id' });
    })
    .catch(() => res
      .status(500)
      .send({ message: 'Ошибка' }));
});

module.exports = router;
