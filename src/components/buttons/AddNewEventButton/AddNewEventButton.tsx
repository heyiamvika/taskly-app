import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../utils/routes';

import './AddNewEventButton.css';

export function AddNewEventButton() {
	return (
		<Link to={ROUTES.ADD_NEW_EVENT}>
			<button className='add-new-event-btn'>+</button>
		</Link>
	);
}
