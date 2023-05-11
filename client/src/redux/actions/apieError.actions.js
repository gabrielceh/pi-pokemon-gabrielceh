export const API_ERROR_SET = 'API_ERROR_SET';
export const API_ERROR_RESET = 'API_ERROR_RESET';

export const apiErrorSet = (error) => {
	return {
		type: 'API_ERROR_SET',
		payload: error,
	};
};

export const apiErrorReset = () => {
	return {
		type: API_ERROR_RESET,
	};
};
