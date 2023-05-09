const router = require('express').Router();

const {
	addPokemon,
	addPokemonAdmin,
	getPokemon,
	getPokemonById,
	getCustomPokemon,
	getPokemonByUser,
	updatePokemon,
	deletePokemon,
} = require('../controllers/pokemon.controller');
const { validatePokemonData, validateTypes } = require('../middleware/validatePokemonData');
const { validationOrder } = require('../middleware/validationOrder');
const { validationPagination } = require('../middleware/validationPagination');

/** GET			"/"					Devuelve los pokemon, paginados y filtrados si se indica
 * GET 			"/:id"				Devuelve el pokemon por id ya sea del usuario o los originales
 * POST 		"/"					Añade un nuevo pokemon
 * PUT			"/"					Actualiza un pokemon
 * DELETE		"/:id"				Elimina un pokemon
 * GET 			"/user/:userId"		Trae todos los pokemon del usuario
 */

router.get('/', validationPagination, validationOrder, getPokemon);
router.get('/:id', getPokemonById);
router.get('/custom', validationPagination, validationOrder, getCustomPokemon);

router.post('/', validatePokemonData, validateTypes, addPokemon);
router.put('/', validatePokemonData, validateTypes, updatePokemon);
router.delete('/:id', deletePokemon);

router.get('/user/:userId', validationPagination, getPokemonByUser);

router.get('/admin/add-pokemon', addPokemonAdmin);

module.exports = router;
