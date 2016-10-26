/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


const Card = ({ card }) => {
	return (
		<div className='card'>
			<div>
				<p>{card.front}</p>
				<Link className='btn' to={`/deck/${card.deckId}/edit/${card.id}`} > Edit </Link>
			</div>
		</div>
	);
};

export default Card;