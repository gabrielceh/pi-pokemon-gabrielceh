const CustomError = require('../../classes/CustomError');
const { Pokemon_Api, Pokemon, Types } = require('../../db');
const { getPokemonData } = require('../../utils/getPokemonData');
const { optionsApi, optionsUser } = require('../../utils/optionToFindPokemon');

// const getPokemonById = async (req, res) => {
// 	try {
// 		const { id } = req.params;

// 		if (isNaN(id)) throw new CustomError(400, 'id should be a number');

// 		const pokemonApiFinded = await Pokemon_Api.findOne({
// 			where: { id: +id },
// 			...optionsApi,
// 			order: [[Types, 'updatedAt', 'DESC']],
// 		});
// 		if (pokemonApiFinded) {
// 			return res.status(200).json(pokemonApiFinded);
// 		}

// 		const pokemonUserFinded = await Pokemon.findOne({ where: { id: +id }, ...optionsUser });
// 		if (pokemonUserFinded) {
// 			return res.status(200).json(pokemonUserFinded);
// 		}

// 		throw new CustomError(400, `Pokemon with id ${id} it not on data base`);
// 	} catch (error) {
// 		const status = error.status || 500;
// 		res.status(status).json({ error: error.message });
// 	}
// };

const getPokemonById = async (req, res) => {
	try {
		const { id } = req.params;

		if (isNaN(id)) throw new CustomError(400, 'id should be a number');

		const pokemonUserFinded = await Pokemon.findOne({ where: { id: +id }, ...optionsUser });
		if (pokemonUserFinded) {
			return res.status(200).json(pokemonUserFinded);
		}

		const pokemonApiFinded = await getPokemonData(id);

		if (pokemonApiFinded.name) {
			return res.status(200).json(pokemonApiFinded);
		}

		throw new CustomError(400, `Pokemon with id "${id}" is not on data base`);
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

module.exports = { getPokemonById };
