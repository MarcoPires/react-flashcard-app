/**
 * npm modules
 */
import React from 'react';
import fuzzysearch from 'fuzzysearch';
import { connect } from 'react-redux';

/**
 * Local module components
 */
import Card from './Card';


/**
 * Return true when the filter text match the card
 * @param  {string} filter 
 * @param  {object} card   
 * @return {boolean}        
 */
const matches = (filter, card) => {
	return fuzzysearch(filter, card.front) || fuzzysearch(filter, card.back);
};

/**
 * Mapping state to properties
 * 
 * @param  {number} deckId 
 * @return {object}       
 */
const mapStateToProps = ( state, router ) => {
	let stateOptions  = state  || {},
		routerOptions = router || {},
		cards         = stateOptions.cards,
		cardFilter    = stateOptions.cardFilter,
		deckId        = routerOptions.params.deckId;

	return {
		cards: cards.filter( (card) => { 
			return card.deckId === deckId && matches(cardFilter, card) 
		})
	};
};


/**
 * Cards wrapper
 * @param  {object} options.cards    cards list
 * @param  {string} options.children html
 * @return {string}                  html
 */
const Cards = ({ cards, children }) => {
	return (
		<div className='main'>
			{cards.map( (card) => <Card card={card} key={card.id} />)}

			{ children }
		</div>
	);
};

export default connect(mapStateToProps)(Cards);