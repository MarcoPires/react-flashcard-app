/**
 * npm modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router';

/**
 * Local modules
 */
import { addDeck, showAddDeck, hideAddDeck } from '../actions';

/**
 * Mapping state to properties
 * @param  {Object} state 
 * @return {Object}       
 */
const mapStateToProps = state =>{
	return {
		decks      : state.decks,
		addingDeck : state.addingDeck
	};
};

/**
 * 
 * Mapping properties to dispatchers
 * 
 * @param  {function} dispatch 
 * @return {object}       
 */
const mapDispatchToProps = dispatch =>{
	return {
		addDeck : name => dispatch(addDeck(name)),
		showAddDeck : () => dispatch(showAddDeck()),
		hideAddDeck : () => dispatch(hideAddDeck())
	};
};

/**
 * Sidebar component
 * @type {Object}
 * @return {String} HTML
 */
const Sidebar = React.createClass({

	componentDidUpdate(prevProps, prevState) {
		 let el = ReactDOM.findDOMNode(this.refs.add);

		 if(el) el.focus();
	},

	render() {
		let props = this.props;
		
		return(
			<div className='sidebar'>
				<h2>All Decks</h2>
				
				<button onClick={ e => this.props.showAddDeck() }>
					New Deck
				</button>

				<ul>
				{props.decks.map((deck, i) =>
					<li key={i}>
						<Link to={`/deck/${deck.id}`}> {deck.name} </Link>
					</li>
				)}
				</ul>

				{ props.addingDeck && <input ref='add'  onKeyPress={this.createDeck}/> }
			</div>
		);
	},
	createDeck(evt) {
		if (evt.which !== 13) return;

		let name = ReactDOM.findDOMNode(this.refs.add).value;
		this.props.addDeck(name);
		this.props.hideAddDeck();
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);