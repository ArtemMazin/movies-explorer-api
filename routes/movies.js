const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:movieId', deleteMovieById);

module.exports = router;
