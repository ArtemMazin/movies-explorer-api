const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../configEnv');
const UnauthorizedError = require('../errors/UnauthorizedError');

const checkAuth = (req, res, next) => {
  if (req.cookies.jwt) {
    const token = req.cookies.jwt;
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      req.user = payload;
    } catch (error) {
      next(new UnauthorizedError('Необходима авторизация'));
      return;
    }
  } else {
    next(new UnauthorizedError('Необходима авторизация'));
    return;
  }

  next();
};

module.exports = checkAuth;
