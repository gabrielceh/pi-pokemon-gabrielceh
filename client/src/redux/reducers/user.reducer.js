import { LOGIN, LOGOUT, REGISTER, RESET_USER, SET_USER_BY_LOCAL } from '../actions/user.action';

const initialState = {
	access: false,
	error: null,
	user: null,
	authToken: null,
};

export const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...action.payload,
			};

		case LOGOUT:
			return {
				...(action?.payload || initialState),
			};

		case REGISTER:
			return {
				...action.payload,
			};

		case SET_USER_BY_LOCAL: {
			return {
				...action.payload,
				error: null,
				access: true,
			};
		}

		case RESET_USER: {
			return initialState;
		}

		default:
			return state;
	}
};
