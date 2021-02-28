const router = require('express').Router();
const { authorizedRequestsValidation } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  removeCard,
  setCardLike,
  unsetCardLike,
} = require('../controllers/cards');

router.get('/cards', getCards); // not to validate

router.post('/cards', authorizedRequestsValidation, createCard);

router.delete('/cards/:cardId', authorizedRequestsValidation, removeCard);

router.put('/cards/likes/:cardId', authorizedRequestsValidation, setCardLike);

router.delete(
  '/cards/likes/:cardId',
  authorizedRequestsValidation,
  unsetCardLike,
);

module.exports = router;
