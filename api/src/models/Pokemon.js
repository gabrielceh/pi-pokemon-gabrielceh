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
				min: {
					args: [1],
					msg: 'hp min should be 1',
				},
				max: {
					args: [255],
					msg: 'hp max should be 255',
				},
			},
		},
		attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [5],
					msg: 'Min attack should be 5',
				},
				max: {
					args: [190],
					msg: 'Max attack should be 190',
				},
			},
		},
		defense: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [20],
					msg: 'Min defense should be 20',
				},
				max: {
					args: [160],
					msg: 'Max defense should be 160',
				},
			},
		},
		special_attack: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [15],
					msg: 'Min special attack should be 15',
				},
				max: {
					args: [190],
					msg: 'Max special attack should be 190',
				},
			},
		},
		special_defense: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [20],
					msg: 'Min special defense should be 20',
				},
				max: {
					args: [250],
					msg: 'Max special defense should be 250',
				},
			},
		},
		speed: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: {
					args: [5],
					msg: 'Min speed should be 5',
				},
				max: {
					args: [136],
					msg: 'Max speed should be 136',
				},
			},
		},
		height: {
			type: {
				type: DataTypes.FLOAT,
				validate: {
					min: {
						args: [0.01],
						msg: 'Min height should be 0.01 mts',
					},
					max: {
						args: [999],
						msg: 'Max height should be 999',
					},
				},
			},
		},
		weight: {
			type: DataTypes.FLOAT,
			validate: {
				min: {
					args: [0.01],
					msg: 'Min weight should be 0.01 Kg',
				},
				max: {
					args: [999],
					msg: 'Max weight should be 999 kg',
				},
			},
		},
	});
};
