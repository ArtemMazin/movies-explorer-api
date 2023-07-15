// import NotFoundError from '../errors/NotFoundError.js';
// import NotEnoughRights from '../errors/NotEnoughRights.js';
// import searchAndUpdateCardDB from '../decorators/searchAndUpdateCardDB.js';

const Movie = require('../models/movie');

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
  Movie.find({})
    .then((movie) => res.send({ data: movie.reverse() }))
    .catch(next);
};

const deleteMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new Error('Фильм не найден'))
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        Movie.deleteOne(card)
          .then(() => res.send({ data: card }))
          .catch(next);
      } else {
        throw new Error('Недостаточно прав для удаления');
      }
    })
    .catch(next);
};

module.exports = {
  createMovie, getMovies, deleteMovieById,
};
