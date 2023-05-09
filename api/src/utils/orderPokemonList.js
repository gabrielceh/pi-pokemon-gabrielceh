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

module.exports = { orderPokemonList };
