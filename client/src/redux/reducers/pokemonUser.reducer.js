import {
	CREATE_USER_POKEMON,
	DELETE_USER_POKEMON,
	GET_USER_POKEMON,
	UPDATE_USER_POKEMON,
	RESET_SUCCESS_USER_POKEMON,
} from '../actions/pokemonUser.action';

const initialState = {
	count: 0,
	next: null,
	prev: null,
	results: [],
	success: null,
};

export const pokemonUserReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_USER_POKEMON:
			return {
				...action.payload,
			};

		case CREATE_USER_POKEMON: {
			return {
				...state,
				count: state.count + 1,
				results: [action.payload, ...state.results],
				success: 'Pokémon Created',
			};
		}

		case UPDATE_USER_POKEMON: {
			const pokemonUpdate = state.results.map((pokemon) => {
				if (pokemon.id === action.payload.id) {
					return action.payload;
				}
				return pokemon;
			});

			return {
				...state,
				results: pokemonUpdate,
				success: 'Pokémon Updated',
			};
		}

		case DELETE_USER_POKEMON: {
			let pokemonFilter = state.results.filter((pokemon) => pokemon.id !== +action.payload);
			return {
				...state,
				count: state.count - 1,
				results: [...pokemonFilter],
				success: 'Pokémon Deleted',
			};
		}

		case RESET_SUCCESS_USER_POKEMON: {
			return {
				...state,
				success: null,
			};
		}

		default:
			return state;
	}
};
