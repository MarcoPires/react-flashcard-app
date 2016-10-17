/**
 * npm modules
 */
import React from 'react';

/**
 * Local module components
 */
import Sidebar from './Sidebar';

/**
 * Application main component
 * @param  {Object} props 
 * @return {String} HTML
 */
const App = (props) => {
	return(
		<div className='app'>
			<Sidebar />
			{props.children}
		</div>
	);
};

export default App;