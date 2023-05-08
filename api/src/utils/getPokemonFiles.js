const fs = require('fs');
const path = require('path');
const CustomError = require('../classes/CustomError');

const URL_BASE = 'https://pokeapi.co/api/v2';

async function getAllPokemon() {
	try {
		let nextUrl = `${URL_BASE}/pokemon/?offset=1280&limit=1`;
		const pokemonList = [];
		// while (nextUrl) {
		const response = await fetch(nextUrl);
		const data = await response.json();
		pokemonList.push(...data.results);
		// nextUrl = data.next;
		// }
		return pokemonList;
	} catch (error) {
		console.log(error);
	}
}

async function getPokemonData(pokemonName) {
	const response = await fetch(`${URL_BASE}/pokemon/${pokemonName}`);
	const data = await response.json();
	let stats = {};
	for (let stat of data.stats) {
		stats[stat.stat.name] = stat.base_stat;
	}

	const typesId = data.types.map((pokType) => {
		let id = pokType.type.url.split('/').at(-2);
		return +id;
	});

	const pokemon = {
		id: data.id,
		name: data.name,
		image: data.sprites.other['official-artwork'].front_default,
		...stats,
		weight: data.weight,
		height: data.height,
		types: [...typesId],
	};
	console.log('add:' + pokemon.name);

	return pokemon;
}

const addPokemonToDataBase = async () => {
	try {
		const allPokemon = await getAllPokemon();
		const pokemonDataList = await Promise.all(
			allPokemon.map((pokemon) => getPokemonData(pokemon.name))
		);

		const filePath = path.join(__dirname, '..', 'data', 'pokemonList14.json');

		const pokemonToSave = JSON.stringify(pokemonDataList);

		fs.writeFile(filePath, pokemonToSave, (err) => {
			if (err) {
				throw new Error(err);
			} else {
				console.log('File create and saved');
			}
		});
	} catch (error) {
		console.log(error);
	}
};

addPokemonToDataBase();
