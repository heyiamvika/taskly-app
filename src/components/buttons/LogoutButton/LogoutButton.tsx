import React from 'react';

import { withRouter } from 'react-router-dom';

import './LogoutButton.css';

import * as ROUTES from '../../../utils/routes';

import { useDispatch } from 'react-redux';
import { logout } from '../../../store/auth';

type Props = {
	// TO_DO: change to type
	history: any;
};

function LogoutButton(props: Props) {
	const dispatch = useDispatch();
	const logoutUser = () => dispatch(logout());

	const onLogoutBtnClick = () => {
		logoutUser();
		props.history.push(ROUTES.WELCOME_SCREEN);
	};

	return (
		<button className='logout-btn' onClick={onLogoutBtnClick}>
			Logout
		</button>
	);
}

export default withRouter(LogoutButton);
