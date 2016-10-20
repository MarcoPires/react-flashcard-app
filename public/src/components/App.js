/**
 * npm modules
 */
import React from 'react';
import { connect } from 'react-redux';

/**
 * Local module components
 */
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';

/**
 * Mapping state to properties
 * 
 * @param  {number} deckId 
 * @return {object}       
 */
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
			<Toolbar deckId={ deckId }/>
			<Sidebar />
			<h1> Deck  </h1>
			{children}
		</div>
	);
};

export default connect(mapStateToProps)(App);