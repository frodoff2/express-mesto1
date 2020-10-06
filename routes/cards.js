const express = require('express');

const router = express.Router();

const { idValidation, cardValidation } = require('../middlewares/validation');

const {
  getCard, createCard, deleteCard, likeCard, removeLike,
} = require('../controllers/cards');

router.get('/', getCard);
router.post('/', cardValidation, createCard);
router.delete('/:id', idValidation, deleteCard);
router.put('/:id/likes', likeCard);
router.delete('/:id/likes', removeLike);

module.exports = router;
