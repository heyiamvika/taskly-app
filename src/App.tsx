import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from './utils/routes';
import { HomePage } from './components/pages/HomePage/HomePage';
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage';

function App() {
	return (
		<Router>
			<div className='app'>
				<Route exact path={ROUTES.WELCOME_SCREEN} component={WelcomePage} />
				<Route path={ROUTES.MAIN_SCREEN} component={HomePage} />
			</div>
		</Router>
	);
}

export default App;
