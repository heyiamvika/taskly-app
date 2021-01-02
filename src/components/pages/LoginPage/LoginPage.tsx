import React from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../../utils/routes';

import './LoginPage.css';

import { PlainTextYellowButton } from '../../buttons/PlainTextYellowButton/PlainTextYellowButton';
import { LoginForm } from '../../forms/LoginForm/LoginForm';

export function LoginPage() {
	return (
		<div className='login-page'>
			<h1 className='login-heading'>Login</h1>
			<LoginForm />
			<div className='login-option'>
				<span>Don't have an account?</span>
				<PlainTextYellowButton text='Signup' to={ROUTES.SIGN_UP} />
			</div>
		</div>
	);
}
