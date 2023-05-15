import axios from 'axios';
import { apiErrorSet } from './apieError.actions';
import { loaderOff, loaderOn } from './loading.actions';
import { base, endpoints } from '../../utils/endpoints';

export const GET_USER_POKEMON = 'GET_USER_POKEMON';
export const UPDATE_USER_POKEMON = 'UPDATE_USER_POKEMON';
export const CREATE_USER_POKEMON = 'CREATE_USER_POKEMON';
export const DELETE_USER_POKEMON = 'DELETE_USER_POKEMON';
export const RESET_SUCCESS_USER_POKEMON = 'RESET_SUCCESS_USER_POKEMON';

const token = localStorage.getItem('auth_token');

const config = {
	headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
};

export const getUserPokemon = (userId) => {
	return async function (dispatch) {
		dispatch(loaderOn());

		try {
			const { data } = await axios.get(`${base}/${endpoints.pokemon}/user/${userId}`);
			dispatch({
				type: GET_USER_POKEMON,
				payload: data,
			});
		} catch (error) {
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};
};

export const createUserPokemon = (pokemon) => {
	return async function (dispatch) {
		dispatch(loaderOn());
		const dataBody = {
			name: pokemon.name,
			image: pokemon.image || null,
			hp: +pokemon.hp,
			attack: +pokemon.attack,
			defense: +pokemon.defense,
			special_attack: +pokemon.special_attack,
			special_defense: +pokemon.special_defense,
			speed: +pokemon.speed,
			weight: +pokemon.weight || null,
			height: +pokemon.height || null,
			types: pokemon.types,
		};

		try {
			const { data } = await axios.post(`${base}/${endpoints.pokemon}`, dataBody, config);
			dispatch({
				type: CREATE_USER_POKEMON,
				payload: data.new_pokemon,
			});
		} catch (error) {
			console.log('user.actions error:', error);
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};
};

export const updateUserPokemon = (pokemon) => {
	return async function (dispatch) {
		dispatch(loaderOn());
		const dataBody = {
			id: pokemon.id,
			name: pokemon.name,
			image: pokemon.image || null,
			hp: pokemon.hp,
			attack: pokemon.attack,
			defense: pokemon.defense,
			special_attack: pokemon.special_attack,
			special_defense: pokemon.special_defense,
			speed: pokemon.speed,
			weight: pokemon.weight || null,
			height: pokemon.height || null,
			types: pokemon.types,
			userId: pokemon.userId,
		};

		try {
			const { data } = await axios.put(`${base}/${endpoints.pokemon}`, dataBody, config);
			dispatch({
				type: UPDATE_USER_POKEMON,
				payload: data.pokemon,
			});
		} catch (error) {
			console.log('user.actions error:', error);
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};
};

export const deleteUserPokemon = (pokemonId) => {
	return async function (dispatch) {
		dispatch(loaderOn());

		try {
			await axios.delete(`${base}/${endpoints.pokemon}/${pokemonId}`, config);
			dispatch({
				type: DELETE_USER_POKEMON,
				payload: pokemonId,
			});
		} catch (error) {
			dispatch(apiErrorSet(error.response.data.error));
		} finally {
			dispatch(loaderOff());
		}
	};
};

export const resetSuccessPokemonUser = () => {
	return {
		type: RESET_SUCCESS_USER_POKEMON,
	};
};
