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

router.put('/cards/:cardId/likes', setCardLike);

router.delete('/cards/:cardId/likes', unsetCardLike);

module.exports = router;
