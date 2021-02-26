const router = require('express').Router();
const {
  getCards,
  createCard,
  removeCard,
  setCardLike,
  unsetCardLike,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', createCard);

router.delete('/cards/:cardId', removeCard);

router.put('/cards/likes/:cardId', setCardLike);

router.delete('/cards/likes/:cardId', unsetCardLike);

module.exports = router;
