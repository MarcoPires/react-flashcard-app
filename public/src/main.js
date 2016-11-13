/**
 * npm modules
 */
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

/**
 * Local modules
 */
import * as reducers from './reducers';
import { fetchData } from './actions';
import * as localStore from './localStore';

/**
 * Local module components
 */
import App from './components/App';
import VisibleCards from './components/VisibleCards';
import NewCardModal from './components/NewCardModal';
import EditCardModal from './components/EditCardModal';
import StudyModal from './components/StudyModal';

/**
 * Binding routerReducer with application reducers as a new property
 * @type {Object}
 */
reducers.routing = routerReducer;

/**
 * Application Store
 * @type {Object}
 */
//const store = createStore(combineReducers(reducers), localStore.get());
const store = createStore(combineReducers(reducers), localStore.get(), applyMiddleware(thunkMiddleware));

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

	        <Route path='/deck/:deckId/new' component={ NewCardModal } />
	        <Route path='/deck/:deckId/edit/:cardId' component={ EditCardModal } />
	        <Route path='/deck/:deckId/study' component={ StudyModal } />

        </Route>

      </Route>

    </Router>
);


function run () {
	console.log("state: ", store.getState());

	ReactDOM.render((
		<Provider store={ store }>

			{ router }

		</Provider>
	), document.getElementById('root'));
};

let lastBody = '';
function save() {
	let state 	 = store.getState(),
		body 	 = JSON.stringify({ decks: state.decks,cards: state.cards }),
		evalBody = JSON.stringify(body);
	
	/**
	 * This will save the data every time the "state" changes
	 */
	localStore.set(state, ['decks', 'cards']);
	
	/**
	 * Only change remote storage when data changes
	 */
	if(evalBody === lastBody) return;

	lastBody = evalBody;

	fetch('/api/data', {
		method: 'POST',
		headers: {
			Accept         : 'application/json',
			'Content-Type' : 'application/json'
		},
		body: body
	});
};

function init () {
	run();
	store.dispatch(fetchData());
	store.subscribe(run);
	store.subscribe(save);
};

init ();