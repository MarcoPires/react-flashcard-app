/**
 * npm modules
 */
import React from 'react';

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

export default App;