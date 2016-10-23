/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';


const Cards = ({ children }) => {
	return (
		<div>
			Deck will display here

			{ children }
		</div>
	);
};

export default Cards;