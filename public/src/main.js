/**
 * npm modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/**
 * Local modules
 */
import * as reducers from './reducers';
import * as localStore from './localStore';

/**
 * Local module components
 */
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';

/**
 * Binding routerReducer with application reducers as a new property
 * @type {Object}
 */
reducers.routing = routerReducer;

/**
 * Application Store
 * @type {Object}
 */
const store = createStore(combineReducers(reducers), localStore.get());

/**
 * Binding browserHistory with application store
 * @type {Object}
 */
const history = syncHistoryWithStore(browserHistory, store);

/**
 * Application Router
 * @type {String} HTML
 */
const router = (
    <Router history={history}>
      
      <Route path='/' component={ App }>
        
        <Route path='/deck/:deckId' component={ VisibleCards }>

	        <Route path='/deck/:deckId/new' component={ NewCardModal }>
	        </Route>

        </Route>

      </Route>

    </Router>
);


function run () {
	let state = store.getState();
	
	/**
	 * This will save the data every time the "state" changes
	 */
	localStore.set(state, ['decks', 'cards']);
	console.log("state: ", state);

	ReactDOM.render((
		<Provider store={ store }>

			{ router }

		</Provider>
	), document.getElementById('root'));
};

run();
store.subscribe(run);