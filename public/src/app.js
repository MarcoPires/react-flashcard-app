/**
 * npm modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { Provider } from 'react-redux';

/**
 * Local modules
 */
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
		<Provider store={ store }>	
			<App>
				<Sidebar></Sidebar>
			</App>
		</Provider>
	), document.getElementById('root'));
}

run();

store.subscribe(run);

window.show = () => store.dispatch(showAddDeck());
window.hide = () => store.dispatch(hideAddDeck());
window.add  = () => store.dispatch(addDeck( new Date().toString() ));