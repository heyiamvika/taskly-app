import React from 'react';
import { withRouter } from 'react-router-dom';

import './UserInfo.css';

import { withFirebase } from '../Firebase/index';

import defaultUser from '../../assets/default-user.svg';
import { LogoutButton } from '../buttons/LogoutButton/LogoutButton';

type Props = {};

const LogoutBtn = withRouter(withFirebase(LogoutButton));

export function UserInfo() {
	return (
		<div className='user-info'>
			<div className='name-actions-wrapper'>
				<span className='user-name'>User Name</span>
				<LogoutBtn />
			</div>
			<div className='profile-pic'>
				<img src={defaultUser}></img>
			</div>
		</div>
	);
}
