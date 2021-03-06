/**
 * npm modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';
import { Link, browserHistory } from 'react-router';

const CardModal = React.createClass({
	
	componentDidUpdate() {
		ReactDOM.findDOMNode(this.refs.front).focus();
	},
	
	render() {
		let { card, onDelete } = this.props;

		return (
			<div className='modal'>
				<h1> { onDelete ? 'Edit' : 'New' } Card </h1>
				<label>Card Front:</label>
				<textarea ref='front' defaultValue={card.front}></textarea>

				<label>Card Back:</label>
				<textarea ref='back' defaultValue={card.back}></textarea>

				<p>
					<button onClick={this.onSave}>Save Card</button>
					<Link className='btn' to={`/deck/${card.deckId}`}> Cancel </Link>
					{
						onDelete ?
						<button className='delete' onClick={this.onDelete}>Delete Card</button>
						: null
					}
				</p>
			</div>
		);
	},

	onSave(evt) {
		let front = ReactDOM.findDOMNode(this.refs.front);
		let back = ReactDOM.findDOMNode(this.refs.back);

		this.props.onSave(assign({}, this.props.card, {
			front: front.value,
			back: back.value
		}));

		browserHistory.push(`/deck/${this.props.card.deckId}`);
	},

	onDelete(evt) {
		this.props.onDelete(this.props.card.id);
		browserHistory.push(`/deck/${this.props.card.deckId}`);
	}
});

export default CardModal;