/**
 * npm modules
 */
import { connect } from 'react-redux';

/**
 * Local modules
 */
import { updateCard, deleteCard } from '../actions';

/**
 * Local module components
 */
import CardModal from './CardModal';


const mapStateToProps = ({ cards }, { params: { cardId } }) => {
	return {
		card: cards.filter( (card) => {

			return String(card.id) === cardId
		})[0]
	};
};

const mapDispatchToProps = dispatch => ({
	onSave: card => dispatch(updateCard(card)),
	onDelete: cardId => dispatch(deleteCard(cardId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);