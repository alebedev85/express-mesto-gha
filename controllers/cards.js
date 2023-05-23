const cardsModel = require('../models/card');

const getCards = (req, res) => {
  cardsModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
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
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

const deleteCard = (req, res) => {
  cardsModel.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      throw new Error('Notfound');
    })
    .then(() => res.send({ message: "Пост удалён" }))
    .catch((err) => {
      if (err.message === 'Notfound') {
        res.status(404).send({ message: 'Card not found' });
        return;
      };
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
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
      if (err.message === 'Notfound') {
        res.status(404).send({ message: 'Card not found' });
        return;
      };
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
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
      if (err.message === 'Notfound') {
        res.status(404).send({ message: 'Card not found' });
        return;
      };
      res.status(500).send({
        message: 'Internal Server Error',
        err: err.message,
        stack: err.stack,
      });
    });
};

module.exports = {
  getCards,
  creatCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
