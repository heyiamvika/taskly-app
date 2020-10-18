import React, { ChangeEvent, FormEvent, useState } from 'react';

import * as ROUTES from '../../../utils/routes';

import './SignupForm.css';

import { OvalYellowButton } from '../../buttons/OvalYellowButton/OvalYellowButton';
import { BasicInput } from '../../inputs/BasicInput/BasicInput';

// type Props = {
// 	// TO_DO: what is the correct type for it?
// 	firebase: any;
// };

type User = {
	username: string;
	email: string;
	passwordOne: string;
	passwordTwo: string;
	error: Error | null;
};

export function SignupForm(props: any) {
	const [user, setUser] = useState<User>({
		username: '',
		email: '',
		passwordOne: '',
		passwordTwo: '',
		error: null,
	});

	const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const { username, email, passwordOne } = user;

		props.firebase
			.createUserWithEmailAndPassword(email, passwordOne)
			.then((authUser: User) => {
				setUser({ ...user, ...authUser });
				props.history.push(ROUTES.MAIN_SCREEN);
			})
			.catch((error: Error) => {
				setUser({ ...user, error });
			});
	};

	const onInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	const isInvalid: boolean =
		!user.username ||
		!user.email ||
		!user.passwordOne ||
		!user.passwordTwo ||
		user.passwordOne !== user.passwordTwo;

	return (
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
			{user.error && <p className='signup-error'>{user.error.message}</p>}
			<div className='submit-btn'>
				<OvalYellowButton text='Signup' type='submit' disabled={isInvalid} />
			</div>
		</form>
	);
}
