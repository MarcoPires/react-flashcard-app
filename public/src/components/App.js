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
const App = ({ children }) => {
	return(
		<div className='app'>
			<Sidebar />
			{children}
		</div>
	);
};

export default App;