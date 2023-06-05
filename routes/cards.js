const router = require('express').Router();
const cardsController = require('../controllers/cards');
const { validateCardBady, validationCardId } = require('../middlewares/validate');

router.get('/', cardsController.getCards);

router.post('/', validateCardBady, cardsController.creatCard);

router.delete('/:cardId', validationCardId, cardsController.deleteCard);

router.put('/:cardId/likes', validationCardId, cardsController.likeCard);

router.delete('/:cardId/likes', validationCardId, cardsController.dislikeCard);

module.exports = router;
