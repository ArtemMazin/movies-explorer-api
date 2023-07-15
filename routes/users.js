const router = require('express').Router();
const {
  updateProfile, getProfile,
} = require('../controllers/users');

router.get('/me', getProfile);

router.patch('/me', updateProfile);

module.exports = router;
