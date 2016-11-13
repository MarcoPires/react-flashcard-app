/**
 * Solve IE incompatibility with es6 promises and featch
 */
import Promise from 'es6-promise';
import 'whatwg-fetch';
window.Promise = window.Promise || Promise;

/**
 * Actions:
 *  - ADD_DECK
 *  - SHOW_ADD_DECK
 *  - HIDE_ADD_DECK
 */
export const addDeck = name => ({ type: 'ADD_DECK', data: name });
export const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
export const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });

/**
 * Actions:
 *  - ADD_CARD
 *  - UPDATE_CARD
 *  - DELETE_CARD
 */
export const addCard = card => ({ type: 'ADD_CARD', data: card });
export const updateCard = card => ({ type: 'UPDATE_CARD', data: card });
export const deleteCard = cardId => ({ type: 'DELETE_CARD', data: cardId });

export const filterCards = query => ({ type: 'FILTER_CARDS', data: query });

export const setShowBack = back => ({ type: 'SHOW_BACK', data: back });

export const receiveData = data => ({ type: 'RECEIEVE_DATA', data: data });

export const failedRequest = error => ({ type: 'RECEIEVE_DATA_ERROR', data: error });

export const startedCall = () => ({ type: 'START_FETCH_DATA'});

export const fetchData = () => {
	return dispatch => {
		dispatch(startedCall())
		fetch('/api/data')
			.then(res => res.json())
			.then(json => dispatch(receiveData(json)))
			.catch(err => dispatch(failedRequest(err)));
	}
};