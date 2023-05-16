import axios from 'axios';
import { endpoints } from '../../utils/endpoints';
import { loaderOff, loaderOn } from './loading.actions';
import { apiErrorSet } from './apieError.actions';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const RESET_USER = 'REGISTER_USER';
export const SET_USER_BY_LOCAL = 'SET_USER_BY_LOCAL';

export const login = (userData) => {
	return async function (dispatch) {
		dispatch(loaderOn());
		const options = {
			email: userData.email.toLowerCase(),
			password: userData.password,
			headers: {
				'Content-Type': 'application/json',
			},
		};

		try {
			const { data } = await axios.post(`${endpoints.login}`, options);
			localStorage.setItem('auth_token', data.auth_token.token);
			dispatch({
				type: LOGIN,
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

export const registerUser = (userData) => {
	return async function (dispatch) {
		dispatch(loaderOn);
		const options = {
			email: userData.email,
			password: userData.password,
			userName: userData.userName,
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const { data } = await axios.post(`${endpoints.register}`, options);
			console.log(data);
			dispatch({
				type: REGISTER,
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

export const logout = () => {
	return async function (dispatch) {
		dispatch(loaderOn);
		const token = localStorage.getItem('auth_token');
		const optins = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		try {
			await axios.get(`${endpoints.logout}`, optins);
			localStorage.removeItem('auth_token');
			window.location.reload();
			dispatch({
				type: LOGOUT,
			});
		} catch (error) {
			console.log('user.actions error:', error);
			dispatch(apiErrorSet(error.response?.data?.error));
		} finally {
			dispatch(loaderOff());
		}
	};
};

export const setUserByLocal = (userData) => {
	return {
		type: SET_USER_BY_LOCAL,
		payload: userData,
	};
};

export const resetUser = () => {
	return {
		type: RESET_USER,
	};
};
