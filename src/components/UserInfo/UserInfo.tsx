import React from 'react';
import { withRouter } from 'react-router-dom';

import './UserInfo.css';

import defaultUser from '../../assets/default-user.svg';
import { LogoutButton } from '../buttons/LogoutButton/LogoutButton';

type Props = {
	user: null | {};
};

export function UserInfo({ user }: Props) {
	return (
		<div className='user-info'>
			<div className='name-actions-wrapper'>
				<span className='user-name'>User Name</span>
				<LogoutButton />
			</div>
			<div className='profile-pic'>
				<img src={defaultUser}></img>
			</div>
		</div>
	);
}
