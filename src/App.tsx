import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from './utils/routes';

import { HomePage } from './components/pages/HomePage/HomePage';
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage';
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';

//Redux imports
import { useDispatch } from 'react-redux';
import { subscribeToUserAuthStateChanges } from './store/auth';

function App() {
	const dispatch = useDispatch();

	// Subscribe to auth changes on app load
	useEffect(() => {
		dispatch(subscribeToUserAuthStateChanges());
	}, [dispatch]);

	return (
		<Router>
			<div className='app'>
				<Route exact path={ROUTES.WELCOME_SCREEN} component={WelcomePage} />
				<Route path={ROUTES.MAIN_SCREEN} component={HomePage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.LOGIN} component={LoginPage} />
			</div>
		</Router>
	);
}

export default App;
