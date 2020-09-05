const express = require('express');

const router = express.Router();

const {
  getUser, findUser, postUser, editProfile, editAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:id', findUser);
router.post('/', postUser);
router.patch('/me', editProfile);
router.patch('/me/avatar', editAvatar);

module.exports = router;
