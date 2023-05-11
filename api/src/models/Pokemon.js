const { DataTypes, literal } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	/**CREATE SEQUENCE id_pokemon_user_secuence START 20000;
	 * En la base de datos se creó la secuencia anterior.
	 * Esto con el fin de que los id de los pokemon creados por el usuario
	 * empiecen desde 20000
	 */
	sequelize.define('Pokemon', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			defaultValue: sequelize.literal("nextval('id_pokemon_user_secuence')"),
			allowNull: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		image: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true, // Validación para verificar si es una URL
			},
		},
		hp: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 255,
			},
		},
		attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 5,
				max: 190,
			},
		},
		defense: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 20,
				max: 160,
			},
		},
		special_attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 15,
				max: 190,
			},
		},
		special_defense: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 20,
				max: 250,
			},
		},
		speed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 5,
				max: 136,
			},
		},
		height: {
			type: DataTypes.FLOAT,
		},
		weight: {
			type: DataTypes.FLOAT,
		},
	});
};
