import React, { FormEvent, useState, useEffect } from 'react';

import './LoginForm.css';

import { OvalYellowButton } from '../../buttons/OvalYellowButton/OvalYellowButton';
import { BasicInput } from '../../inputs/BasicInput/BasicInput';

//Redux imports
import { useDispatch, useSelector } from 'react-redux';
import { login, isUserLoggedIn, getAuthError } from '../../../store/auth';

// Router imports
import { withRouter } from 'react-router-dom';
import * as ROUTES from '../../../utils/routes';

// TO_DO: change type of props
type Props = {
	history: any;
};

type LoginUserDetails = {
	email: string;
	password: string;
};

function LoginForm(props: Props) {
	const [loginUserDetails, setLoginUserDetails] = useState<LoginUserDetails>({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();
	const userLoggedIn = useSelector(isUserLoggedIn);
	const authError = useSelector(getAuthError);

	useEffect(() => {
		if (userLoggedIn)
			// Redirect to Main Screen
			props.history.push(ROUTES.MAIN_SCREEN);
	});

	const onFormSubmit = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();
		const { email, password } = loginUserDetails;
		dispatch(login(email, password));
	};

	const onInputChange = (newValue: string, key: string) => {
		setLoginUserDetails({ ...loginUserDetails, [key]: newValue });
	};

	const isInvalid: boolean =
		!loginUserDetails.email || !loginUserDetails.password;

	return (
		<form className='signup-form' onSubmit={onFormSubmit}>
			<BasicInput
				name='email'
				value={loginUserDetails.email}
				onChange={onInputChange}
				inputType='text'
				placeholder='Email Address'
				color='yellow'
			/>
			<BasicInput
				name='password'
				value={loginUserDetails.password}
				onChange={onInputChange}
				inputType='password'
				placeholder='Password'
				color='yellow'
			/>
			{authError && <p className='signup-error'>{authError}</p>}
			<div className='submit-btn'>
				<OvalYellowButton text='Login' type='submit' disabled={isInvalid} />
			</div>
		</form>
	);
}

export default withRouter(LoginForm);
