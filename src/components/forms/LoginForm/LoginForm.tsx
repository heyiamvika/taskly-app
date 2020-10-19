import React, { ChangeEvent, FormEvent, useState } from 'react';

import * as ROUTES from '../../../utils/routes';

import './LoginForm.css';

import { OvalYellowButton } from '../../buttons/OvalYellowButton/OvalYellowButton';
import { BasicInput } from '../../inputs/BasicInput/BasicInput';

// type Props = {
// 	// TO_DO: what is the correct type for it?
// 	firebase: any;
// };

type User = {
	email: string;
	password: string;
	error: Error | null;
};

export function LoginForm(props: any) {
	const [user, setUser] = useState<User>({
		email: '',
		password: '',
		error: null,
	});

	const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		const { email, password } = user;

		props.firebase
			.signInWithEmailAndPassword(email, password)
			.then((authUser: User) => {
				setUser({ ...user, ...authUser });
				props.history.push(ROUTES.MAIN_SCREEN);
			})
			.catch((error: Error) => {
				setUser({ ...user, error });
			});
	};

	const onInputChange = <Type extends {}>(newValue: Type, key: string) => {
		setUser({ ...user, [key]: newValue });
	};

	const isInvalid: boolean = !user.email || !user.password;

	return (
		<form className='signup-form' onSubmit={onFormSubmit}>
			<BasicInput
				name='email'
				value={user.email}
				onChange={onInputChange}
				inputType='text'
				placeholder='Email Address'
				color='yellow'
			/>
			<BasicInput
				name='password'
				value={user.password}
				onChange={onInputChange}
				inputType='password'
				placeholder='Password'
				color='yellow'
			/>
			{user.error && <p className='signup-error'>{user.error.message}</p>}
			<div className='submit-btn'>
				<OvalYellowButton text='Login' type='submit' disabled={isInvalid} />
			</div>
		</form>
	);
}
