import React from 'react';

import './LogoutButton.css';

import * as ROUTES from '../../../utils/routes';

export function LogoutButton(props: any) {
	const onLogoutBtnClick = () => {
		props.firebase.signOut();
		props.history.push(ROUTES.WELCOME_SCREEN);
	};

	return (
		<button className='logout-btn' onClick={onLogoutBtnClick}>
			Logout
		</button>
	);
}

export default LogoutButton;
