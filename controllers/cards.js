const cardsModel = require('../models/card');

const HaveNoRightError = require('../errors/have-no-right');
const NotFoundError = require('../errors/not-found-err');

const getCards = (req, res, next) => {
  cardsModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const creatCard = (req, res, next) => {
  cardsModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((users) => {
      res.status(201).send(users);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  cardsModel.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Такой карточки не существует');
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new HaveNoRightError('Вы не можете удалить чужую карточку');
      }
      cardsModel.findByIdAndRemove(req.params.cardId)
        .then(() => res.send({ message: 'Пост удалён' }));
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  cardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Такой карточки не существует');
  })
    .then((card) => res.send(card))
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  cardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).orFail(() => {
    throw new NotFoundError('Такой карточки не существует');
  })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
