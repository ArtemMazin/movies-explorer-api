const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const NotEnoughRights = require('../errors/NotEnoughRights');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

const getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movie) => res.send({ data: movie.reverse() }))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Фильм не найден'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Movie.deleteOne(card)
          .then(() => res.send({ data: card }))
          .catch(next);
      } else {
        throw new NotEnoughRights('Недостаточно прав для удаления');
      }
    })
    .catch(next);
};

module.exports = {
  createMovie, getMovies, deleteMovieById,
};
