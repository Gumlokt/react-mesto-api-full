const router = require('express').Router();
const { authorizedRequestsValidation } = require('../middlewares/validation');

const {
  getUsers,
  getUserProfile,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers); // not to validate

router.get('/users/me', authorizedRequestsValidation, getUserProfile);

router.patch('/users/me', authorizedRequestsValidation, updateUserProfile);

router.patch(
  '/users/me/avatar',
  authorizedRequestsValidation,
  updateUserAvatar,
);

module.exports = router;
