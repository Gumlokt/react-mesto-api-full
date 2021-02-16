const router = require('express').Router();
const {
  getUser,
  getUsers,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users/:userId', getUser);

router.get('/users', getUsers);

router.post('/users', createUser);

router.patch('/users/me', updateUserProfile);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
