const { Op } = require('sequelize');
const path = require('path');
const fs = require('fs');

const CustomError = require('../classes/CustomError');
const readFiles = require('../utils/readFiles');
const { pagination } = require('../utils/pagination');
const { getMyHost } = require('../utils/localhost');
const { orderPokemonList } = require('../utils/orderPokemonList');
const { includeTypes, optionsApi, optionsUser } = require('../utils/optionToFindPokemon');

const { Pokemon, Pokemon_Api, Types, User } = require('../db');

const getPokemonSlice = (data = [], offset = 0, limit = 12) => {
	/**Funcion para el paginado de los pokemon de la base de datos */
	const dataSlice = data.slice(offset, offset + limit);
	return dataSlice;
};

const getPokemonByName = async (res, name, optionsApi, optionsUser) => {
	try {
		const pokemonApiFinded = await Pokemon_Api.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
			...optionsApi,
		});
		const pokemonUserFinded = await Pokemon.findAll({
			where: {
				name: {
					[Op.like]: `%${name}%`,
				},
			},
			...optionsUser,
		});

		if (!pokemonUserFinded && !pokemonApiFinded) {
			throw new CustomError(400, `Pokemon ${name} not found`);
		}

		const pokemonFinded = [...pokemonApiFinded, ...pokemonUserFinded];

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

		const pokemonApiList = await Pokemon_Api.findAll(optionsApi);
		const pokemonUserList = await Pokemon.findAll(optionsUser);

		let pokemonData = [...pokemonApiList, ...pokemonUserList];

		if (orderby && ordertype) {
			pokemonData = orderPokemonList([...pokemonApiList, ...pokemonUserList], orderby, ordertype);
		}

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;

		const { count, nextOffset, prevOffset, dataList, maxPage, currentPage } = pagination(
			getPokemonSlice,
			pokemonData,
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
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const getPokemon = (req, res) => {
	let { name } = req.query;

	if (name) {
		getPokemonByName(res, name, optionsApi, optionsUser);
	} else {
		return getAllPokemon(res, req, optionsApi, optionsUser);
	}
};

const getPokemonById = async (req, res) => {
	try {
		const { id } = req.params;

		const pokemonApiFinded = await Pokemon_Api.findOne({ where: { id: +id }, ...optionsApi });
		if (pokemonApiFinded) {
			return res.status(200).json(pokemonApiFinded);
		}

		const pokemonUserFinded = await Pokemon.findOne({ where: { id: +id }, ...optionsUser });
		if (pokemonUserFinded) {
			return res.status(200).json(pokemonUserFinded);
		}

		throw new CustomError(400, `Pokemon with id ${id} it not on data base`);
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const getCustomPokemon = async (req, res) => {};

const addPokemon = async (req, res) => {
	try {
		const {
			name,
			image,
			hp,
			attack,
			defense,
			special_attack,
			special_defense,
			speed,
			weight,
			height,
			types,
			userId,
		} = req.body;

		const userFound = await User.findByPk(userId);

		if (!userFound) throw new CustomError(400, 'User is not in data base');

		const pokemonFinded = await Pokemon.findOne({ where: { name: name.toLowerCase() } });

		if (pokemonFinded) throw new CustomError(400, `Pokemon '${name}' is already in the data base`);

		const newPokemon = await userFound.createPokemon({
			name: name.toLowerCase(),
			image: image || null,
			hp: +hp,
			attack: +attack,
			defense: +defense,
			special_attack: +special_attack,
			special_defense: +special_defense,
			speed: +speed,
			height: height || null,
			weight: weight || null,
			userId,
		});

		await newPokemon.addType(types);

		const pokemonReturned = await Pokemon.findOne({
			where: {
				[Op.and]: [{ name: name.toLowerCase() }, { userId }],
			},
			...optionsUser,
		});

		res.status(201).json({ success: true, new_pokemon: pokemonReturned });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const getPokemonByUser = async (req, res) => {
	/**Busca al pokemon segun el id del usuario que lo creó */
	try {
		const { userId } = req.params;
		let { offset, limit } = req.query;

		const userFound = await User.findByPk(userId);

		if (!userFound) throw new CustomError(400, 'User not found');

		const pokemonByUser = await Pokemon.findAll({
			where: { userId },
			...optionsUser,
		});

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;

		const { count, nextOffset, prevOffset, dataList, maxPage, currentPage } = pagination(
			getPokemonSlice,
			pokemonByUser,
			offset,
			limit
		);

		const next =
			currentPage >= maxPage
				? null
				: `${myHost.origin}/pokemon/user/${userId}/?offset=${nextOffset}&limit=${limit}${orderString}`;

		const prev =
			currentPage === 1
				? null
				: `${myHost.origin}/pokemon/user/${userId}/?offset=${prevOffset}&limit=${limit}${orderString}`;

		res.status(200).json({ count, next, prev, results: dataList });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const updatePokemon = async (req, res) => {
	try {
		const {
			id,
			name,
			image,
			hp,
			attack,
			defense,
			special_attack,
			special_defense,
			speed,
			weight,
			height,
			types,
			userId,
		} = req.body;

		if (!id) throw new CustomError(400, 'Please, send the pokemon id');

		if (typeof id !== 'number') throw new CustomError(400, 'Pokemon id should be a number');

		const userFound = await User.findByPk(userId);

		if (!userFound) throw new CustomError(400, 'User is not in data base');

		const pokemonFinded = await Pokemon.findByPk(id);

		if (!pokemonFinded) throw new CustomError(400, `Pokemon '${name}' is not in the data base`);

		await pokemonFinded.update(
			{
				name: name.toLowerCase(),
				image: image || null,
				hp: +hp,
				attack: +attack,
				defense: +defense,
				special_attack: +special_attack,
				special_defense: +special_defense,
				speed: +speed,
				height: height || null,
				weight: weight || null,
			},
			{
				where: {
					[Op.and]: [{ id: id }, { userId }],
				},
			}
		);

		await pokemonFinded.setTypes(types);

		const returnedPokemon = await Pokemon.findByPk(id, { ...optionsUser });

		res.status(201).json({ success: true, pokemon: returnedPokemon });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const deletePokemon = async (req, res) => {
	try {
		const { id } = req.params;
		const { userId } = req.body;

		if (!id || !userId) throw new CustomError(400, 'Please, send the pokemon id and user id');

		const userFound = await User.findByPk(userId);

		if (!userFound) throw new CustomError(400, 'User is not in data base');

		const pokemonFinded = await Pokemon.findByPk(+id);

		if (!pokemonFinded) throw new CustomError(400, `Pokemon id '${id}' is not in the data base`);

		await pokemonFinded.destroy();

		res.status(200).json({ success: true });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

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
							id: pokemon.id,
							name: pokemon.name,
							image: pokemon.image,
							hp: pokemon.hp,
							attack: pokemon.attack,
							defense: pokemon.defense,
							special_attack: pokemon['special-attack'],
							special_defense: pokemon['special-defense'],
							speed: pokemon.speed,
							weight: pokemon.weight,
							height: pokemon.height,
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

module.exports = {
	addPokemon,
	addPokemonAdmin,
	getPokemon,
	getPokemonById,
	getCustomPokemon,
	getPokemonByUser,
	updatePokemon,
	deletePokemon,
};
