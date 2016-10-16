/**
 * npm modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';

/**
 * Local modules
 */
import { addDeck, showAddDeck, hideAddDeck } from './actions';
import * as reducers from './reducers';

/**
 * Local module components
 */
import App from './components/App';
import Sidebar from './components/Sidebar';




/**
 * Application Store
 * @type {Object}
 */
const store = Redux.createStore(Redux.combineReducers(reducers));



function run () {
	let state = store.getState();
	
	console.log("state: ", state);

	ReactDOM.render((
		<App>
			<Sidebar 
				decks={state.decks} 
				addingDeck={state.addingDeck} 
				addDeck={name => store.dispatch(addDeck(name))}
				showAddDeck={() => store.dispatch(showAddDeck())}
				hideAddDeck={() => store.dispatch(hideAddDeck())}
				>
			</Sidebar>
		</App>
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add  = () => store.dispatch(addDeck( new Date().toString() ));