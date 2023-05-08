const router = require('express').Router();

const { addPokemon, addPokemonAdmin, getAllPokemon } = require('../controllers/pokemon.controller');
const { validationOrder } = require('../middleware/validationOrder');
const { validationPagination } = require('../middleware/validationPagination');

router.get('/', validationPagination, validationOrder, getAllPokemon);

router.get('/admin/add-pokemon', addPokemonAdmin);

module.exports = router;
