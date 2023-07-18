const handleErrors = (err, req, res, next) => {
  const { statusCode = 500 } = err;

  res.status(err.statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : err.message,
    status: statusCode,
  });
  next();
};

module.exports = handleErrors;
