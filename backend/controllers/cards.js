const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ data: cards }))
    .catch((err) => {
      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(400)
          .send({ message: `Данные не прошли валидацию: ${err.message}` });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.removeCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('ErrorCardDeletion'))
    .then((card) => {
      res.status(200).send({ data: card, message: 'Карточка удалена' });
    })
    .catch((err) => {
      console.log(err.name);

      if (err.message === 'ErrorCardDeletion') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID карточки' });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.setCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('ErrorSettingLikeToTheCard'))
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.message === 'ErrorSettingLikeToTheCard') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID карточки' });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};

module.exports.unsetCardLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('ErrorUnsettingLikeToTheCard'))
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.message === 'ErrorUnsettingLikeToTheCard') {
        res
          .status(404)
          .send({ message: 'Карточка с указанным ID отсутствует' });
        return;
      }

      if (err.name === 'CastError') {
        res.status(400).send({ message: 'Указан не валидный ID карточки' });
        return;
      }

      res
        .status(500)
        .send({ message: `Что-то пошло не так... ${err.message}` });
    });
};
