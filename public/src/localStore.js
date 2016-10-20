/**
 * Fetch object from LocalStorage
 * @return {object} 
 */
export const get = () => JSON.parse(localStorage.getItem('state')) || undefined;

/**
 * Save object in LocalStorage
 * @param  {array} state List of values to save
 * @param  {array} props List of keys to save
 * @return {object}       Saved data
 */
export const set = (state, props) => {
	let toSave = {};

	props.forEach((p) => {
		toSave[p] = state[p];
	});

	localStorage.setItem('state', JSON.stringify(toSave));
	return toSave;
};