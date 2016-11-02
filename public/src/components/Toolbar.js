/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/**
 * Local modules
 */
import { showAddDeck, filterCards } from '../actions';

/**
 * Mapping properties to dispatchers
 * 
 * @param  {function} dispatch 
 * @return {object}       
 */
const mapDispatchToProps = dispatch => ({
	showAddDeck: () => dispatch(showAddDeck()),
	onFilter: query => dispatch(filterCards(query))
})

/**
 * Toolbar component
 * @type {Object}
 * @return {String} HTML
 */
const Toolbar = ({deckId, showAddDeck, onFilter}) => {
	let deckTools = deckId ? (
			<div>
				<Link className="btn" to={`/deck/${deckId}/new`}> ✚ New Card </Link>
				<Link className="btn" to={`/deck/${deckId}/study`}> Study </Link>

				<input
					onChange={ evt => onFilter(evt.target.value) }
					className="search"
					type="search"
					placeholder="Search Deck..."
				/>
			</div>
		) : null;

	return (
		<div className="toolbar">
			<div>
				<button onClick={ showAddDeck } > ✚ New Deck </button>
			</div>
		{ deckTools }
		</div>
	);
};

export default connect(null, mapDispatchToProps)(Toolbar);