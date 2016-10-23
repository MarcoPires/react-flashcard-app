/**
 * npm modules
 */
import { connect } from 'react-redux';

/**
 * Local modules
 */
import { addCard } from '../actions';

/**
 * Local module components
 */
import CardModal from './CardModal';


const mapStateToProps = (props, { params: { deckId } }) => ({
	card: { deckId: deckId }
});

const mapDispatchToProps = dispatch => ({
	onSave: card => dispatch(addCard(card))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);