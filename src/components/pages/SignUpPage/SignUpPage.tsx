import React, { ChangeEvent, FormEvent, useState } from 'react';
import * as ROUTES from '../../../utils/routes';

import './SignUpPage.css';

import { OvalYellowButton } from '../../buttons/OvalYellowButton/OvalYellowButton';
import { PlainTextYellowButton } from '../../buttons/PlainTextYellowButton/PlainTextYellowButton';
import { BasicInput } from '../../inputs/BasicInput/BasicInput';

export function SignUpPage() {
	const [user, setUser] = useState({
		username: '',
		email: '',
		passwordOne: '',
		passwordTwo: '',
		error: null,
	});

	const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('form submitted');
		console.log(user);
	};

	const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	return (
		<div className='signup-page'>
			<h1 className='signup-heading'>Signup to Taskly</h1>
			<form className='signup-form' onSubmit={onFormSubmit}>
				<BasicInput
					name='username'
					value={user.username}
					onChange={onInputChange}
					inputType='text'
					placeholder='Full Name'
				/>
				<BasicInput
					name='email'
					value={user.email}
					onChange={onInputChange}
					inputType='text'
					placeholder='Email Address'
				/>
				<BasicInput
					name='passwordOne'
					value={user.passwordOne}
					onChange={onInputChange}
					inputType='password'
					placeholder='Password'
				/>
				<BasicInput
					name='passwordTwo'
					value={user.passwordTwo}
					onChange={onInputChange}
					inputType='password'
					placeholder='Confirm Password'
				/>
				<div className='submit-btn'>
					<OvalYellowButton text='Signup' type='submit' />
				</div>
				{/* {user.error && <p>{user.error.message}</p>} */}
			</form>
			<div className='login-option'>
				<span>Do you have an account?</span>
				<PlainTextYellowButton text='Login' to={ROUTES.LOGIN} />
			</div>
		</div>
	);
}
