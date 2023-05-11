export const LOADER_ON = 'LOADER_ON';
export const LOADER_OFF = 'LOADER_OFF';

export const loaderOn = () => {
	return { type: LOADER_ON };
};
export const loaderOff = () => {
	return { type: LOADER_OFF };
};
