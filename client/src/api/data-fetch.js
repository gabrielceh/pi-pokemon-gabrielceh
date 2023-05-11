import { base } from '../utils/endpoints.js';

export const getURL = (resource = null) => {
	return new URL(`${base}/${resource || ''}`);
};
