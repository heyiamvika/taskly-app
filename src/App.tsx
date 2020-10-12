import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from './utils/routes';
import { HomePage } from './components/pages/HomePage/HomePage';
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage';
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage';

function App() {
	return (
		<Router>
			<div className='app'>
				<Route exact path={ROUTES.WELCOME_SCREEN} component={WelcomePage} />
				<Route path={ROUTES.MAIN_SCREEN} component={HomePage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
			</div>
		</Router>
	);
}

export default App;
