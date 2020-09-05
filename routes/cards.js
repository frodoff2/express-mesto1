const express = require('express');

const router = express.Router();

const {
  getCard, createCard, deleteCard, likeCard, removeLike,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', createCard);
router.delete('/:id', deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', removeLike);

module.exports = router;
