const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { register, login } = require('../controllers/users');
const checkAuth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { loginValidation, registerValidation } = require('../utils/validationConfig');

router.post('/signin', loginValidation, login);

router.post('/signup', registerValidation, register);

router.use(checkAuth);

router.use('/users', userRoutes);

router.use('/movies', movieRoutes);

router.use('*', (req, res, next) => next(new NotFoundError('Указан некорректный маршрут')));

module.exports = router;
