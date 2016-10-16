/**
 * Cards Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
export const cards = (state, action) => {
	
	switch(action.type){
		case 'ADD_CARD':
			let newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date()
			});

			return state.concat([newCard]);
		default:
			return state || [];
	} 
};

/**
 * Decks Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
export const decks = (state, action) => {

	switch(action.type){
		case 'ADD_DECK':
			let newDeck = {
				name: action.data,
				id: +new Date()
			};

			return state.concat([newDeck]);
		default:
			return state || [];
	} 
};

/**
 * AddingDeck Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
export const addingDeck = (state, action) => {

	switch(action.type){
		case 'SHOW_ADD_DECK': return true;
		case 'HIDE_ADD_DECK': return false;
		default: return !!state;
	} 
};