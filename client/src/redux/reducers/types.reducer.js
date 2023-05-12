import { GET_TYPES } from '../actions/types.actions';

const intitialState = [];

export const typesReducer = (state = intitialState, action) => {
	switch (action.type) {
		case GET_TYPES: {
			return [...action.payload.results];
		}

		default:
			return state;
	}
};
