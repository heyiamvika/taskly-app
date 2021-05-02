import React from 'react';
import { withRouter } from 'react-router-dom';

import * as ROUTES from '../../../utils/routes';

import './SignUpPage.css';

import { withFirebase } from '../../Firebase/index';

import { PlainTextYellowButton } from '../../buttons/PlainTextYellowButton/PlainTextYellowButton';
import { SignupForm } from '../../forms/SignupForm/SignupForm';

const SignUpFormWithFirebase = withRouter(withFirebase(SignupForm));

export function SignUpPage() {
	return (
		<div className='signup-page'>
			<h1 className='signup-heading'>Signup</h1>
			<SignUpFormWithFirebase />
			<div className='login-option'>
				<span>Do you have an account?</span>
				<PlainTextYellowButton text='Login' to={ROUTES.LOGIN} />
			</div>
		</div>
	);
}
