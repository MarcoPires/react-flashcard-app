
/**
 * Actions:
 *  - ADD_DECK
 *  - SHOW_ADD_DECK
 *  - HIDE_ADD_DECK
 */
const addDeck = name => ({ type: 'ADD_DECK', data: name });
const showAddDeck = () => ({ type: 'SHOW_ADD_DECK' });
const hideAddDeck = () => ({ type: 'HIDE_ADD_DECK' });

/**
 * Cards Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
const cards = (state, action) => {
	
	switch(action.type){
		case 'ADD_CARD':
			let newCard = Object.assign({}, action.data, {
				score: 1,
				id: +new Date()
			});

			return state.concat([newCard]);
		default:
			return state || [];
	} 
};

/**
 * Decks Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
const decks = (state, action) => {

	switch(action.type){
		case 'ADD_DECK':
			let newDeck = {
				name: action.data,
				id: +new Date()
			};

			return state.concat([newDeck]);
		default:
			return state || [];
	} 
};

/**
 * AddingDeck Reducer
 * @param  {Array} state  
 * @param  {Object} action
 * @return {Array} state
 */
const addingDeck = (state, action) => {

	switch(action.type){
		case 'SHOW_ADD_DECK': return true;
		case 'HIDE_ADD_DECK': return false;
		default: return !!state;
	} 
};

/**
 * Application Store
 * @type {Object}
 */
const store = Redux.createStore(Redux.combineReducers({
	cards      : cards,
	decks      : decks,
	addingDeck : addingDeck
}));

/**
 * Application main component
 * @param  {Object} props 
 * @return {String} HTML
 */
const App = (props) => {
	return(
		<div className='app'>
			{props.children}
		</div>
	);
};

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

function run () {
	let state = store.getState();
	
	console.log("state: ", state);

	ReactDOM.render((
		<App>
			<Sidebar decks={state.decks} addingDeck={state.addingDeck} >
			</Sidebar>
		</App>
	), document.getElementById('root'));
}

run();

store.subscribe(run);


window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add  = () => store.dispatch(addDeck( new Date().toString() ));