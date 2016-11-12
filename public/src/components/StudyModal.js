/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/**
 * Local modules
 */
import { updateCard, setShowBack } from '../actions';


/**
 * Milliseconds in a day
 * @type {Number}
 */
const MS_IN_DAY = 86400000;


/**
 * Check if the card is ready to be studied, when the card is from the current deck 
 * and has never been studied or is ready to be studied again.
 * @param  {object} card 
 * @return {boolean}
 */
const cardIsReadyToBeStudied = ( card, deckId ) => {
	return (card.deckId === deckId && (!card.lastStudiedOn || ((new Date() - card.lastStudiedOn)/MS_IN_DAY)  >= card.score));
};

/**
 * Mapping state to properties
 * 
 * @param  {array} options.cards 
 * @param  {boolean} options.showBack 
 * @param  {number} options.params.deckId 
 * @return {object}       
 */
const mapStateToProps = ( reducers, router ) => {
	let reduOpts   = reducers || {},
		routerOpts = router   || {},
		cards 	   = reduOpts.cards,
		showBack   = reduOpts.showBack,
		deckId     = routerOpts.params.deckId;

	return {
		showBack : showBack,
		deckId   : deckId,
		card     : cards.filter( (card) => cardIsReadyToBeStudied( card, deckId ) )[0]
	};
};
 
/**
 * Mapping properties to dispatchers
 * 
 * @param  {function} dispatch 
 * @return {object}       
 */
const mapDispatchToProps = dispatch => ({
	onStudied: (cardId, score) => {
		let now = new Date();
		
		/**
		 * Allow the card to be studied after midnight
		 */
		now.setHours(0, 0, 0, 0);
		
		dispatch(updateCard({
			id: cardId, 
			score: score, 
			lastStudiedOn: toString(now)
		}));
		dispatch(setShowBack(false));
	},
	onFlip: () => dispatch(setShowBack(true))
})

/**
 * Study Modal component, that allow students to study a card and rate it by:
 * Poorly - 1 point = study after 1 day
 * Okay - 2 points = study after 2 days
 * Great - 3 points = study after 3 days
 * @param  {object} options.card 
 * @param  {boolean} options.showBack 
 * @param  {function} options.onFlip 
 * @param  {function} options.onStudied 
 * @param  {number} options.deckId 
 * @return {string} HTML
 */
const StudyModal = ({ card, showBack, onFlip, onStudied, deckId }) => {
	let body = (
		<div className='no-cards'>
			<p>
				You have no cards to study in this deck right now. Good Job!
			</p>
		</div>
	);

	if (card) {
		body = (
			<div className='study-card'>
				<div className={ showBack ? 'front hide' : 'front'}>
					<div>
						<p>
							{ card.front }
						</p>
					</div>
					<button onClick={ onFlip } >
						Flip
					</button>
				</div>
				<div className={ showBack ? 'back' : 'back hide'}>
					<div>
						<p>
							{ card.back }
						</p>
					</div>
					<p>
						How did you do?
					</p>
					<button onClick={ e => onStudied( card.id, Math.max(card.score - 1, 1)) } >
						Poorly
					</button>
					<button onClick={ e => onStudied( card.id, card.score) } >
						Okay
					</button>
					<button onClick={ e => onStudied( card.id, Math.min(card.score + 1, 3)) } >
						Great
					</button>
				</div>

			</div>
		);
	};

	return (
		<div className='modal study-modal'>
			<Link className='btn close' to={`/deck/${deckId}`}>x</Link>
			{ body }
		</div>
	);
};

export default connect(mapStateToProps, mapDispatchToProps)(StudyModal);