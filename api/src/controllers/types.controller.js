const CustomError = require('../classes/CustomError');
const { Types, Pokemon, Pokemon_Api } = require('../db');
const { getTypesFromApi } = require('../utils/getTypesFromApi');
const { pagination } = require('../utils/pagination');
const { POKE_API_URL, TYPE_SOURCE } = require('../utils/pokeApiUrl');
const { getMyHost } = require('../utils/localhost');
const { orderBy, orderTypes } = require('../utils/orderValues');

const filterByIdList = (data = [], offset = 0, limit = 12) => {
	/**Funcion para el paginado de los pokemon de la base de datos */
	const dataSlice = data.slice(offset, offset + limit);
	return dataSlice;
};

const getPokemonByTypes = async (id, orderby = null, ordertype = null) => {
	/** Obtenemos los pokemos filtrados por el id del tipo y nos devolverá solo el id del los que
	 * cumplen con la condicion, y si vienen los parametros orderby y order los ordenará.
	 * El bucle for nos ayudará a retornar los datos completos de los pokemon de ese tipo ya que
	 * al principio solo devuelve un solo tipo para el pokemon.
	 */
	const order = orderby && ordertype && [[orderby, ordertype]];

	const pokemonByType = await Pokemon_Api.findAll({
		order,
		attributes: ['id'],
		include: [
			{
				model: Types,
				attributes: ['id', 'name'],
				through: {
					attributes: [],
				},
				where: { id: id },
			},
		],
	});
	let pokemonWithType = [];

	for (let pok of pokemonByType) {
		const pk = await Pokemon_Api.findOne({
			where: { id: pok.id },
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
		});
		pokemonWithType.push(pk);
	}

	return pokemonWithType;
};

const getTypes = async (req, res) => {
	try {
		const allTypes = await Types.findAll();
		const typesFromApi = await getTypesFromApi();
		let typeToReturn = [];

		if (!allTypes.length || allTypes.length !== typesFromApi.length) {
			const newTypes = await Types.bulkCreate(typesFromApi);
			typeToReturn = newTypes.map((type) => {
				return {
					id: type.dataValues.id,
					name: type.dataValues.name,
				};
			});
			return res.status(201).json({ results: typeToReturn });
		}

		typeToReturn = allTypes.map((type) => {
			return {
				id: type.dataValues.id,
				name: type.dataValues.name,
			};
		});

		res.status(200).json({ results: typeToReturn });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const typeFilterById = async (req, res) => {
	try {
		const { id } = req.params;
		let { offset, limit, orderby, ordertype } = req.query;
		const myHost = getMyHost(req);

		if (isNaN(id)) {
			throw new CustomError(404, 'Please, send a numeric id');
		}

		const foundedType = await Types.findByPk(+id);

		if (!foundedType) {
			throw new CustomError(404, 'The type id is not in the data base');
		}

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;

		const getPokemonByType = await getPokemonByTypes(foundedType.id, orderby, ordertype);
		const { count, nextOffset, prevOffset, dataList, maxPage, currentPage } = pagination(
			filterByIdList,
			getPokemonByType,
			offset,
			limit
		);

		const orderString = orderby && ordertype ? `&orderby=${orderby}&ordertype=${ordertype}` : '';

		const next =
			currentPage >= maxPage
				? null
				: `${myHost.origin}/types/${id}/?offset=${nextOffset}&limit=${limit}${orderString}`;

		const prev =
			currentPage === 1
				? null
				: `${myHost.origin}/types/${id}/?offset=${prevOffset}&limit=${limit}${orderString}`;

		res
			.status(200)
			.json({ count, next, prev, name: foundedType.dataValues.name, results: dataList });
	} catch (error) {
		console.log(error);
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

const pokemonFilterList = (data = [], offset = 0, limit = 12) => {
	const dataSlice = data.slice(offset, offset + limit);
	const returnedArray = dataSlice.map((pokemon) => {
		return {
			name: pokemon.pokemon.name,
			url: pokemon.pokemon.url,
		};
	});

	return returnedArray;
};

const filterTypesApi = async (req, res) => {
	try {
		const { id } = req.params;
		let { offset, limit } = req.query;
		const myHost = getMyHost(req);

		if (!id) {
			throw CustomError(400, 'Please, send the id');
		}
		if (isNaN(id)) {
			throw new CustomError(400, 'Ash, Id should be a number');
		}

		const response = await fetch(`${POKE_API_URL}/${TYPE_SOURCE}/${id}`);
		const { pokemon, name } = await response.json();

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;
		const { count, nextOffset, prevOffset, dataList, maxPage, currentPage } = pagination(
			pokemonFilterList,
			pokemon,
			offset,
			limit,
			`types/filter-pag/${id}`,
			req
		);

		const next =
			currentPage >= maxPage
				? null
				: `${myHost.origin}/types/${id}/?offset=${nextOffset}&limit=${limit}`;

		const prev =
			currentPage === 1
				? null
				: `${myHost.origin}/types/${id}/?offset=${prevOffset}&limit=${limit}`;

		res.status(200).json({ count, next, prev, name, results: dataList });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

module.exports = {
	getTypes,
	filterTypesApi,
	typeFilterById,
};
