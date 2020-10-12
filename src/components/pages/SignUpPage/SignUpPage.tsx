import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as ROUTES from '../../../utils/routes';

import './SignUpPage.css';

import FirebaseContext from '../../Firebase/context';

import { PlainTextYellowButton } from '../../buttons/PlainTextYellowButton/PlainTextYellowButton';
import { SignupForm } from '../../forms/SignupForm/SignupForm';

export function SignUpPage() {
	return (
		<div className='signup-page'>
			<h1 className='signup-heading'>Signup to Taskly</h1>
			<FirebaseContext.Consumer>
				{(firebase) => <SignupForm firebase={firebase} />}
			</FirebaseContext.Consumer>
			<div className='login-option'>
				<span>Do you have an account?</span>
				<PlainTextYellowButton text='Login' to={ROUTES.LOGIN} />
			</div>
		</div>
	);
}
