const router = require('express').Router();
const cardsController = require('../controllers/cards');
const { validateCardBady } = require('../middlewares/validate');

router.get('/', cardsController.getCards);

router.post('/', validateCardBady, cardsController.creatCard);

router.delete('/:cardId', cardsController.deleteCard);

router.put('/:cardId/likes', cardsController.likeCard);

router.delete('/:cardId/likes', cardsController.dislikeCard);

module.exports = router;
