const CustomError = require('../../classes/CustomError');
const { User, Pokemon } = require('../../db');
const { getMyHost } = require('../../utils/localhost');
const { optionsUser } = require('../../utils/optionToFindPokemon');
const { pagination } = require('../../utils/pagination');
const { getPokemonSlice } = require('../../utils/pokemonSlice');

const getPokemonByUser = async (req, res) => {
	/**Busca al pokemon segun el id del usuario que lo creó */
	try {
		const { userId } = req.params;
		let { offset, limit } = req.query;
		const myHost = getMyHost(req);

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

module.exports = { getPokemonByUser };
