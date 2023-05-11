const base = 'http://localhost:3001/pokemon-api';

export const endpoints = {
	pokemon: `${base}/pokemon`,
	pokemon_by_user: `${base}/pokemon/user`,
	pokemon_users: `${base}/pokemon/users/pokemon`,
	login: `${base}/user/login`,
	register: `${base}/user/register`,
	logout: `${base}/user/logout`,
	types: `${base}/types`,
};
