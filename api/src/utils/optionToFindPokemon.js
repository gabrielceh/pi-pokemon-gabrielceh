/**Archivo que contiene las opciones al momento de buscar pokemon
 * attributes: las columnas que devolveremos
 * includeTypes: si incluye los tipos del pokemon
 * optionApi: Para los pokemon guardados en la bd con tabla Pokemon_Api
 * optionsUser: Para los pokemon guardados en la bd con tabla Pokemon
 */

const { Types, User } = require('../db');

const attributes = [
	'id',
	'name',
	'image',
	'hp',
	'attack',
	'defense',
	'special_attack',
	'special_defense',
	'weight',
	'height',
];

const includeTypes = {
	model: Types,
	attributes: ['id', 'name'],
	through: {
		attributes: [],
	},
};
const optionsApi = {
	attributes: attributes,
	include: [includeTypes],
};
const optionsUser = {
	attributes: attributes,
	include: [
		includeTypes,
		{
			model: User,
			attributes: ['email'],
			through: {
				attributes: [],
			},
		},
	],
};

module.exports = { attributes, includeTypes, optionsApi, optionsUser };
