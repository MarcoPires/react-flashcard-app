/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Local module components
 */
import Card from './Card';


/**
 * Mapping state to properties
 * 
 * @param  {number} deckId 
 * @return {object}       
 */
const mapStateToProps = ( { cards }, { params: { deckId } } ) => {
	return {
		cards: cards.filter( (c) => { return c.deckId === deckId } )
	}
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