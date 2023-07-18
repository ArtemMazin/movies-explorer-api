const router = require('express').Router();
const {
  updateProfile, getProfile,
} = require('../controllers/users');
const { updateProfileValidation } = require('../utils/validationConfig');

router.get('/me', getProfile);

router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
