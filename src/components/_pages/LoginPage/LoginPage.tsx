import React from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../../utils/routes';

import './LoginPage.css';

import { withFirebase } from '../../Firebase/index';

import { PlainTextYellowButton } from '../../buttons/PlainTextYellowButton/PlainTextYellowButton';
import { LoginForm } from '../../forms/LoginForm/LoginForm';

const LoginFormWithFirebase = withRouter(withFirebase(LoginForm));

export function LoginPage() {
	return (
		<div className='login-page'>
			<h1 className='login-heading'>Login</h1>
			<LoginFormWithFirebase />
			<div className='login-option'>
				<span>Don't have an account?</span>
				<PlainTextYellowButton text='Signup' to={ROUTES.SIGN_UP} />
			</div>
		</div>
	);
}
