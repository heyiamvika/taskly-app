import React, { FormEvent, useState, useEffect } from 'react';

import './SignupForm.css';

import { OvalYellowButton } from '../../buttons/OvalYellowButton/OvalYellowButton';
import { BasicInput } from '../../inputs/BasicInput/BasicInput';

// Router imports
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../../utils/routes';

//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import {
	subscribeToUserAuthStateChanges,
	signup,
	isUserLoggedIn,
} from '../../../store/auth';

type Props = {
	history: any;
};

type FormUserDetails = {
	username: string;
	email: string;
	passwordOne: string;
	passwordTwo: string;
	error: Error | null;
};

function SignupForm(props: Props) {
	const [formUserDetails, setFormUserDetails] = useState<FormUserDetails>({
		username: '',
		email: '',
		passwordOne: '',
		passwordTwo: '',
		error: null,
	});

	const dispatch = useDispatch();
	const userLoggedIn = useSelector(isUserLoggedIn);

	// Run only on component load
	useEffect(() => {
		dispatch(subscribeToUserAuthStateChanges());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userLoggedIn) {
			// Redirect to Main Screen
			props.history.push(ROUTES.MAIN_SCREEN);
			return;
		}
	});

	const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const { email, passwordOne } = formUserDetails;
		dispatch(signup(email, passwordOne));
	};

	const onInputChange = (newValue: string, key: string) => {
		setFormUserDetails({ ...formUserDetails, [key]: newValue });
	};

	const isInvalid: boolean =
		!formUserDetails.username ||
		!formUserDetails.email ||
		!formUserDetails.passwordOne ||
		!formUserDetails.passwordTwo ||
		formUserDetails.passwordOne !== formUserDetails.passwordTwo;

	return (
		<form className='signup-form' onSubmit={onFormSubmit}>
			<BasicInput
				name='username'
				value={formUserDetails.username}
				onChange={onInputChange}
				inputType='text'
				placeholder='Full Name'
				color='yellow'
			/>
			<BasicInput
				name='email'
				value={formUserDetails.email}
				onChange={onInputChange}
				inputType='text'
				placeholder='Email Address'
				color='yellow'
			/>
			<BasicInput
				name='passwordOne'
				value={formUserDetails.passwordOne}
				onChange={onInputChange}
				inputType='password'
				placeholder='Password'
				color='yellow'
			/>
			<BasicInput
				name='passwordTwo'
				value={formUserDetails.passwordTwo}
				onChange={onInputChange}
				inputType='password'
				placeholder='Confirm Password'
				color='yellow'
			/>
			{formUserDetails.error && (
				<p className='signup-error'>{formUserDetails.error.message}</p>
			)}
			<div className='submit-btn'>
				<OvalYellowButton text='Signup' type='submit' disabled={isInvalid} />
			</div>
		</form>
	);
}

export default withRouter(SignupForm);
