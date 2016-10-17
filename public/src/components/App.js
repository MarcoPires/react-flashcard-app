/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Local module components
 */
import Sidebar from './Sidebar';

const mapStateToProps = (props, { params: { deckId } }) => ({
	deckId: deckId
});

/**
 * Application main component
 * @param  {Object} props 
 * @return {String} HTML
 */
const App = ({ deckId, children }) => {
	return(
		<div className='app'>
			<Sidebar />
			<h1> Deck { deckId } </h1>
			{children}
		</div>
	);
};

export default connect(mapStateToProps)(App);