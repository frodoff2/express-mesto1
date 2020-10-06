const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (cards) {
        res.status(200).send({ cards });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.createCard = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const { name, link, owner = req.user._id } = req.body;
  Card.create({ name, link, owner })
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'Ошибка на сервере' }));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    // eslint-disable-next-line no-underscore-dangle
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.id,
    // eslint-disable-next-line no-underscore-dangle
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  // eslint-disable-next-line no-underscore-dangle
  const owner = req.user._id;
  Card.findOneAndDelete({ _id: req.params.id, owner })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.send(card);
    })
    .catch(next);
};

/*
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
}; */
