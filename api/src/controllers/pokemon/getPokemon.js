const { Op } = require('sequelize');
const CustomError = require('../../classes/CustomError');
const { Pokemon_Api, Pokemon } = require('../../db');
const { getMyHost } = require('../../utils/localhost');
const { optionsApi, optionsUser } = require('../../utils/optionToFindPokemon');
const { pagination } = require('../../utils/pagination');
const { getPokemonSlice } = require('../../utils/pokemonSlice');
const { POKE_API_URL, POKEMON_SOURCE } = require('../../utils/pokeApiUrl');
const { getPokemonData } = require('../../utils/getPokemonData');

// const getPokemonByName = async (res, name, optionsApi, optionsUser) => {
// 	try {
// 		const pokemonApiFinded = await Pokemon_Api.findAll({
// 			where: {
// 				name: {
// 					[Op.like]: `%${name}%`,
// 				},
// 			},
// 			...optionsApi,
// 		});
// 		const pokemonUserFinded = await Pokemon.findAll({
// 			where: {
// 				name: {
// 					[Op.like]: `%${name}%`,
// 				},
// 			},
// 			...optionsUser,
// 		});

// 		if (!pokemonUserFinded && !pokemonApiFinded) {
// 			throw new CustomError(400, `Pokemon ${name} not found`);
// 		}

// 		const pokemonFinded = [...pokemonApiFinded, ...pokemonUserFinded];

// 		return res.status(200).json(pokemonFinded);
// 	} catch (error) {
// 		const status = error.status || 500;
// 		res.status(status).json({ error: error.message });
// 	}
// };

// const getAllPokemon = async (res, req, optionsApi, optionsUser) => {
// 	/**Obtine los pokemos originales de la db y los pokemon creados por los usuarios
// 	 * Los ordena mediante la funcion orderPokemonList
// 	 * Realiza la paginacion
// 	 * Devuelve los pokemon ordenados por id(defaul), name o attack
// 	 */
// 	try {
// 		let { offset, limit, orderby, ordertype } = req.query;
// 		const myHost = getMyHost(req);

// 		const pokemonApiList = await Pokemon_Api.findAll(optionsApi);
// 		const pokemonUserList = await Pokemon.findAll(optionsUser);

// 		let pokemonData = [...pokemonApiList, ...pokemonUserList];

// 		if (orderby && ordertype) {
// 			pokemonData = orderPokemonList([...pokemonApiList, ...pokemonUserList], orderby, ordertype);
// 		}

// 		offset = offset ? +offset : 0;
// 		limit = limit ? +limit : 12;

// 		const orderString = orderby && ordertype ? `&orderby=${orderby}&ordertype=${ordertype}` : '';
// 		const { count, next, prev, dataList, maxPage, currentPage } = pagination(
//			req
// 			getPokemonSlice,
// 			pokemonData,
// 			offset,
// 			limit,
// 			`pokemon`,
// 			orderString
// 		);

// 		res.status(200).json({ count, next, prev, results: dataList });
// 	} catch (error) {
// 		const status = error.status || 500;
// 		res.status(status).json({ error: error.message });
// 	}
// };

const getPokemonByName = async (res, name, optionsApi, optionsUser) => {
	try {
		const responseApi = await getPokemonData(name);
		console.log(responseApi);

		const pokemonUserFinded = await Pokemon.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
			...optionsUser,
		});

		if (!pokemonUserFinded.length && responseApi.status >= 400) {
			throw new CustomError(400, `Pokemon ${name} not found`);
		}

		const pokemonFinded = [responseApi, ...pokemonUserFinded];

		return res.status(200).json(pokemonFinded);
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const getAllPokemon = async (res, req, optionsApi, optionsUser) => {
	/**Obtine los pokemos originales de la db y los pokemon creados por los usuarios
	 * Los ordena mediante la funcion orderPokemonList
	 * Realiza la paginacion
	 * Devuelve los pokemon ordenados por id(defaul), name o attack
	 */
	try {
		let { offset, limit, orderby, ordertype } = req.query;
		const myHost = getMyHost(req);

		const apiPokemon = await fetch(`${POKE_API_URL}/${POKEMON_SOURCE}/?offset=0&limit=40`);
		const { results } = await apiPokemon.json();

		const pokemonApiList = await Promise.all(
			results.map((pokemon) => getPokemonData(pokemon.name))
		);

		const pokemonUserList = await Pokemon.findAll(optionsUser);

		let pokemonData = [...pokemonApiList, ...pokemonUserList];

		if (orderby && ordertype) {
			pokemonData = orderPokemonList([...pokemonApiList, ...pokemonUserList], orderby, ordertype);
		}

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;

		const orderString = orderby && ordertype ? `&orderby=${orderby}&ordertype=${ordertype}` : '';
		const { count, next, prev, dataList, maxPage, currentPage } = pagination(
			req,
			getPokemonSlice,
			pokemonData,
			offset,
			limit,
			`pokemon`,
			orderString
		);

		res.status(200).json({ count, next, prev, results: dataList });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const getPokemon = (req, res) => {
	let { name } = req.query;

	if (name) {
		return getPokemonByName(res, name, optionsApi, optionsUser);
	} else {
		return getAllPokemon(res, req, optionsApi, optionsUser);
	}
};

module.exports = { getPokemon };
