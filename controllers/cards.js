const Card = require('../models/card');

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (cards) {
        res.status(200).send({ cards });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'Ошибка на сервере' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    // eslint-disable-next-line no-underscore-dangle
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.id,
    // eslint-disable-next-line no-underscore-dangle
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
};
