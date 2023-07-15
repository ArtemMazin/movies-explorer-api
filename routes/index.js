const router = require('express').Router();
const userRoutes = require('./users');
const { register, login } = require('../controllers/users');
const checkAuth = require('../middlewares/auth');

router.post('/signin', login);

router.post('/signup', register);

router.use(checkAuth);

router.use('/users', userRoutes);

// router.use('/cards', cardRoutes);

router.use('*', (req, res, next) => next(new Error('Указан некорректный маршрут')));

module.exports = router;