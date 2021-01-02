import React, { useContext } from 'react';

import './WelcomePage.css';

import logo from '../../../assets/logo.svg';
import person from '../../../assets/person-big.png';

import * as ROUTES from '../../../utils/routes';

import { OvalYellowButton } from '../../buttons/OvalYellowButton/OvalYellowButton';
import { PlainTextYellowButton } from '../../buttons/PlainTextYellowButton/PlainTextYellowButton';

import StoreContext from '../../../contexts/storeContext';

export function WelcomePage() {
	const store = useContext(StoreContext);
	console.log(store.getState());

	return (
		<div className='welcome-page'>
			<img className='logo' src={logo} alt='taskly-logo' />
			<div className='action-group'>
				<span className='heading'>Freelancer's life is a mess</span>
				<span className='subheading'>
					Planning the daily work, it has never been so impacting
				</span>
				<div className='authorization-options'>
					<div className='signup-option'>
						<OvalYellowButton
							text='Signup'
							to={ROUTES.SIGN_UP}
							disabled={false}
						/>
					</div>
					<div className='login-option'>
						<span>Do you have an account?</span>
						<PlainTextYellowButton text='Login' to={ROUTES.LOGIN} />
					</div>
				</div>
			</div>
			<img
				className='decoration-image'
				src={person}
				alt='a person with a phone'
			/>
		</div>
	);
}
