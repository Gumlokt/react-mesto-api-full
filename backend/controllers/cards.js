const Card = require('../models/card');

const { BadRequestError, NotFoundError, ForbiddenError } = require('../errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(
      (card) =>
        // eslint-disable-next-line implicit-arrow-linebreak
        Card.findById(card._id)
          .populate(['owner', 'likes'])
          .orFail(new NotFoundError('Карточка с указанным ID отсутствует'))
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Указан не валидный ID карточки'));
            }

            next(err);
          }),
      // eslint-disable-next-line function-paren-newline
    )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Данные не прошли валидацию: ${err.message}`));
      }

      next(err);
    });
};

module.exports.removeCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFoundError('Карточка с указанным ID отсутствует'))
    .then((cardToRemove) => {
      if (cardToRemove.owner._id.toString() === req.user._id) {
        Card.findOneAndRemove({
          _id: req.params.cardId,
          owner: { _id: req.user._id },
        })
          .orFail(new NotFoundError('Карточка с указанным ID отсутствует'))
          .then((card) => {
            res.status(200).send({ data: card, message: 'Карточка удалена' });
          })
          .catch((err) => {
            if (err.name === 'CastError') {
              next(new BadRequestError('Указан не валидный ID карточки'));
            }

            next(err);
          });
      } else {
        next(
          new ForbiddenError('Нельзя удалять карточки других пользователей'),
        );
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Указан не валидный ID карточки'));
      }

      next(err);
    });
};

module.exports.setCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с указанным ID отсутствует'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Указан не валидный ID карточки'));
      }

      next(err);
    });
};

module.exports.unsetCardLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .populate(['owner', 'likes'])
    .orFail(new NotFoundError('Карточка с указанным ID отсутствует'))
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Указан не валидный ID карточки'));
      }

      next(err);
    });
};
