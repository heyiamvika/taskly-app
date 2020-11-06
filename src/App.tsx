import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as ROUTES from './utils/routes';

import { HomePage } from './components/pages/HomePage/HomePage';
import { WelcomePage } from './components/pages/WelcomePage/WelcomePage';
import { SignUpPage } from './components/pages/SignUpPage/SignUpPage';
import { LoginPage } from './components/pages/LoginPage/LoginPage';

import { withFirebase } from './components/Firebase/index';
import {
	AuthUserContext,
	withAuthentification,
	withAuthorization,
} from './components/Session';

// to-do: use compose + pipe from 'lodash-fp';
const HomePageWithFirebase = withFirebase(
	withAuthentification(withAuthorization(HomePage)),
);

function App(props: any) {
	const [user, setUser] = useState<{} | null>(null);

	useEffect(() => {
		//componentDidMount
		//componentDidUpdate
		props.firebase.auth.onAuthStateChanged((authUser: any) => {
			authUser ? setUser(authUser) : setUser(null);
		});
	});

	return (
		<AuthUserContext.Provider value={user}>
			<Router>
				<div className='app'>
					<Route exact path={ROUTES.WELCOME_SCREEN} component={WelcomePage} />
					<Route path={ROUTES.MAIN_SCREEN} component={HomePageWithFirebase} />
					<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
					<Route path={ROUTES.LOGIN} component={LoginPage} />
				</div>
			</Router>
		</AuthUserContext.Provider>
	);
}

export default withFirebase(App);
