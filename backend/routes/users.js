const router = require('express').Router();
const {
  // getUser,
  getUsers,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

// router.get('/users/:userId', getUser);

router.get('/users', getUsers);

router.get('/users/me', getUserProfile);

router.patch('/users/me', updateUserProfile);

router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router;
