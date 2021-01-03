import React from 'react';

import './UserInfo.css';

import defaultUser from '../../assets/default-user.svg';
import LogoutButton from '../buttons/LogoutButton/LogoutButton';

import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../../store/auth';

export function UserInfo() {
	const dispatch = useDispatch();
	const user = useSelector(getCurrentUser);

	return (
		<div className='user-info'>
			<div className='name-actions-wrapper'>
				<span className='user-name'>User Name</span>
				<LogoutButton />
			</div>
			<div className='profile-pic'>
				<img src={defaultUser} alt='default user'></img>
			</div>
		</div>
	);
}
