const cardsModel = require('../models/card');
const handleError = require('../utils/handleError');

const getCards = (req, res) => {
  cardsModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const creatCard = (req, res) => {
  cardsModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((users) => {
      res.status(201).send(users);
    })
    .catch((err) => {
      handleError(err, res);
    });
};

const deleteCard = (req, res) => {
  cardsModel.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then(() => res.send({ message: 'Пост удалён' }))
    .catch((err) => {
      handleError(err, res);
    });
};

const likeCard = (req, res) => {
  cardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).orFail(() => {
    throw new Error('Notfound');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      handleError(err, res);
    });
};

const dislikeCard = (req, res) => {
  cardsModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).orFail(() => {
    throw new Error('Notfound');
  })
    .then((card) => res.send(card))
    .catch((err) => {
      handleError(err, res);
    });
};

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
