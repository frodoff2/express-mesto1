const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); //
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const AuthError = require('../errors/auth-error');
const RequestError = require('../errors/request-err');

module.exports.postUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      email: req.body.email,
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      password: hash,
    }))

    .then((user) => res.send(user))
    .catch(() => {
      throw new RequestError('Что-то не так с запросом');
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users) {
        res.status(200).send({ users });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.findUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.editProfile = (req, res, next) => {
  const { name, about } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.editAvatar = (req, res, next) => {
  const { avatar } = req.body;

  // eslint-disable-next-line no-underscore-dangle
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      }
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      // создаем токен
      // eslint-disable-next-line no-underscore-dangle
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch(() => {
      throw new AuthError('Что-то не так с авторизацией');
    })
    .catch(next);
};
