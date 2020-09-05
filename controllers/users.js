const User = require('../models/user');

module.exports.getUser = (req, res) => {
  User.find({})
    .then((users) => {
      if (users) {
        res.status(200).send({ users });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
};

module.exports.postUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(err.message ? 400 : 500).send({ message: err.message || 'Ошибка на сервере' }));
};

module.exports.editProfile = (req, res) => {
  const { name, about } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
};

module.exports.editAvatar = (req, res) => {
  const { avatar } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      res.status(404).send({ message: 'Нет пользователя' });
    })
    .catch(() => res.status(500).send({ message: 'Не найден айди' }));
};
