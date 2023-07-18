const router = require('express').Router();
const { getMovies, createMovie, deleteMovieById } = require('../controllers/movies');
const { deleteMovieByIdValidation, createMovieValidation } = require('../utils/validationConfig');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:movieId', deleteMovieByIdValidation, deleteMovieById);

module.exports = router;
