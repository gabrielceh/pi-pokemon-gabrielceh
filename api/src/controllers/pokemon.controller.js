const path = require('path');
const fs = require('fs');
const CustomError = require('../classes/CustomError');
const readFiles = require('../utils/readFiles');
const { Pokemon, Pokemon_Api, Types } = require('../db');
const { pagination } = require('../utils/pagination');
const { getMyHost } = require('../utils/localhost');

const getPokemonSlice = (data = [], offset = 0, limit = 12) => {
	/**Funcion para el paginado de los pokemon de la base de datos */
	const dataSlice = data.slice(offset, offset + limit);
	return dataSlice;
};

const orderPokemonList = (data = [], orderby, ordertype) => {
	const sortedPokemon = data.sort((a, b) => {
		if (ordertype === 'asc') {
			if (a.dataValues[orderby] > b.dataValues[orderby]) return 1;
			if (a.dataValues[orderby] < b.dataValues[orderby]) return -1;
		}
		if (ordertype === 'desc') {
			if (a.dataValues[orderby] > b.dataValues[orderby]) return -1;
			if (a.dataValues[orderby] < b.dataValues[orderby]) return 1;
		}
	});
	return sortedPokemon;
};

const getAllPokemon = async (req, res) => {
	/**Obtine los pokemos originales de la db y los pokemon creados por los usuarios
	 * Los ordena mediante la funcion orderPokemonList
	 * Realiza la paginacion
	 * Devuelve los pokemon ordenados por id(defaul), name o attack
	 */
	try {
		let { offset, limit, orderby, ordertype } = req.query;
		const myHost = getMyHost(req);

		const options = {
			attributes: [
				'id',
				'name',
				'image',
				'hp',
				'attack',
				'defense',
				'special-attack',
				'special-defense',
				'weight',
				'height',
			],
			include: [
				{
					model: Types,
					attributes: ['id', 'name'],
					through: {
						attributes: [],
					},
				},
			],
		};

		const pokemonList = await Pokemon_Api.findAll(options);
		const pokemonUserList = await Pokemon.findAll(options);

		let pokemonDataOrder = [...pokemonList, ...pokemonUserList];

		if (orderby && ordertype) {
			pokemonDataOrder = orderPokemonList([...pokemonList, ...pokemonUserList], orderby, ordertype);
		}

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;

		const { count, nextOffset, prevOffset, dataList, maxPage, currentPage } = pagination(
			getPokemonSlice,
			pokemonDataOrder,
			offset,
			limit
		);

		const orderString = orderby && ordertype ? `&orderby=${orderby}&ordertype=${ordertype}` : '';

		const next =
			currentPage >= maxPage
				? null
				: `${myHost.origin}/pokemon/?offset=${nextOffset}&limit=${limit}${orderString}`;

		const prev =
			currentPage === 1
				? null
				: `${myHost.origin}/pokemon/?offset=${prevOffset}&limit=${limit}${orderString}`;

		res.status(200).json({ count, next, prev, results: dataList });
	} catch (error) {
		console.log(error);
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const addPokemon = (req, res) => {};

const addPokemonAdmin = async (req, res) => {
	/**Añade los pokemon que estan en el archivo PokDataBase a la base de datos */
	try {
		const allPokemon = await Pokemon_Api.findAll();

		if (!allPokemon.length) {
			const filePath = path.join(__dirname, '..', 'data', 'PokDataBase.json');
			// const filePath = path.join(__dirname, '..', 'data', 'PokDataBase.json');
			readFiles(filePath)
				.then(async (data) => {
					for (let pokemon of data) {
						const pok = {
							'id': pokemon.id,
							'name': pokemon.name,
							'image': pokemon.image,
							'hp': pokemon.hp,
							'attack': pokemon.attack,
							'defense': pokemon.defense,
							'special-attack': pokemon['special-attack'],
							'special-defense': pokemon['special-defense'],
							'speed': pokemon.speed,
							'weight': pokemon.weight,
							'height': pokemon.height,
						};
						const newPokemon = await Pokemon_Api.create(pok);
						newPokemon.addType(pokemon.types);
					}
					res.status(200).json(data);
				})
				.catch((error) => {
					console.log(error);
					const status = error.status;
					return res.status(status).json({ error: error.message });
				});
		} else {
			res.status(200).json(allPokemon);
		}
	} catch (error) {
		const status = error.status;
		return res.status(status).json({ error: error.message });
	}
};

module.exports = { addPokemon, addPokemonAdmin, getAllPokemon };
