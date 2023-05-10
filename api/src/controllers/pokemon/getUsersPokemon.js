const { Pokemon } = require('../../db');
const { getMyHost } = require('../../utils/localhost');
const { optionsUser } = require('../../utils/optionToFindPokemon');
const { pagination } = require('../../utils/pagination');
const { getPokemonSlice } = require('../../utils/pokemonSlice');

const getUsersPokemon = async (req, res) => {
	try {
		let { offset, limit } = req.query;
		const myHost = getMyHost(req);

		const pokemonUser = await Pokemon.findAll({
			...optionsUser,
		});

		offset = offset ? +offset : 0;
		limit = limit ? +limit : 12;

		const { count, nextOffset, prevOffset, dataList, maxPage, currentPage } = pagination(
			getPokemonSlice,
			pokemonUser,
			offset,
			limit
		);

		const next =
			currentPage >= maxPage
				? null
				: `${myHost.origin}/custom/?offset=${nextOffset}&limit=${limit}${orderString}`;

		const prev =
			currentPage === 1
				? null
				: `${myHost.origin}/custom/?offset=${prevOffset}&limit=${limit}${orderString}`;

		res.status(200).json({ count, next, prev, results: dataList });
	} catch (error) {
		const status = error.status || 500;
		res.status(status).json({ error: error.message });
	}
};

module.exports = { getUsersPokemon };
