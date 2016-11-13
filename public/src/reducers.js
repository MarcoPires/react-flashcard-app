/**
 * npm modules
 */
import assign from 'object-assign';


/**
 * Allow the user to see the back of a card
 * @param  {boolean} state  
 * @param  {object} action 
 * @return {boolean} 
 */
export const showBack = (state, action) => {

	switch(action.type){
		case 'SHOW_BACK':
			return action.data || false;
		default:
			return state || false;
	}
};

/**
 * Card Filter
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
export const cardFilter = (state, action) => {

	switch(action.type){
		case 'FILTER_CARDS':
			return action.data;
		default:
			return state || '';
	}
};

/**
 * Cards Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
export const cards = (state, action) => {

	switch(action.type){
		case 'RECEIEVE_DATA':
			return action.data.cards || state;
		case 'RECEIEVE_DATA_ERROR':
			return action.data || state;
		case 'START_FETCH_DATA':
			return state || [];

		case 'ADD_CARD':
			let newCard = assign({}, action.data, {
				score: 1,
				id: +new Date()
			});

			return state.concat([newCard]);

		case 'UPDATE_CARD':
			let updateCard = action.data;

			return state.map(card => {
				if(card.id !== updateCard.id) return card;

				return assign({}, card, updateCard);
			});
			
		case 'DELETE_CARD':
			return state.filter(card => {
				return card.id !== action.data;
			});

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
		
		case 'RECEIEVE_DATA':
			return action.data.decks || state;
		case 'RECEIEVE_DATA_ERROR':
			return action.data || state;
		case 'START_FETCH_DATA':
			return state || [];
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