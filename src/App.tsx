import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from './utils/routes';

import { HomePage } from './components/pages/HomePage/HomePage';
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage';
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';

function App(props: any) {
	// const [user, setUser] = useState<{} | null>(null);

	// useEffect(() => {
	// 	//componentDidMount
	// 	//componentDidUpdate
	// 	props.firebase.auth.onAuthStateChanged((authUser: any) => {
	// 		authUser ? setUser(authUser) : setUser(null);
	// 	});
	// });

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
