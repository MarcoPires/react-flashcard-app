/**
 * npm modules
 */
import React from 'react';

/**
 * Sidebar component
 * @type {Object}
 * @return {String} HTML
 */
const Sidebar = React.createClass({
	render() {
		let props = this.props;
		
		return(
			<div className='sidebar'>
				<h2>All Decks</h2>
				<ul>
				{props.decks.map((deck, i) =>
					<li key={i}> {deck.name} </li>
				)}
				</ul>
				{ props.addingDeck && <input ref='add' /> }
			</div>
		);
	}
});

export default Sidebar;