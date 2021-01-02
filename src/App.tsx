import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from './utils/routes';

import { HomePage } from './components/pages/HomePage/HomePage';
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage';
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';

import StoreContext from './contexts/storeContext';
import store from './store/store';

function App() {
	return (
		<StoreContext.Provider value={store}>
			<Router>
				<div className='app'>
					<Route exact path={ROUTES.WELCOME_SCREEN} component={WelcomePage} />
					<Route path={ROUTES.MAIN_SCREEN} component={HomePage} />
					<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
					<Route path={ROUTES.LOGIN} component={LoginPage} />
				</div>
			</Router>
		</StoreContext.Provider>
	);
}

export default App;
