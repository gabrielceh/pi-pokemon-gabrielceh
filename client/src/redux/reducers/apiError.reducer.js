import { API_ERROR_SET, API_ERROR_RESET } from '../actions/apieError.actions';

const initialState = {
	error: null,
};

export const errorReducer = (state = initialState, action) => {
	switch (action.type) {
		case API_ERROR_SET:
			return {
				...state,
				error: action.payload,
			};
		case API_ERROR_RESET:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
