import axios from 'axios';
import { base, endpoints } from '../../utils/endpoints';
import { loaderOff, loaderOn } from './loading.actions';
import { apiErrorSet } from './apieError.actions';

export const GET_TYPES = 'GET_TYPES';

export const getTypes = () => {
	return async function (dispatch) {
		dispatch(loaderOn());

		try {
			const { data } = await axios(`${base}/${endpoints.types}`);
			dispatch({
				type: GET_TYPES,
				payload: data,
			});
		} catch (error) {
			console.log('user.actions error:', error);
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};
};
