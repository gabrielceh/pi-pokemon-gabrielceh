import { LOADER_ON, LOADER_OFF } from '../actions/loading.actions';

export const loaderReducer = (state = false, action) => {
	switch (action.type) {
		case LOADER_ON:
			state = true;
			return state;

		case LOADER_OFF:
			state = false;
			return state;

		default:
			return false;
	}
};
