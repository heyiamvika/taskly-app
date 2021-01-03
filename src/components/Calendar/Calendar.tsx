import React from 'react';

import './Calendar.css';

import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarNav } from '../CalendarNav/CalendarNav';

export function Calendar() {
	return (
		<div className='calendar'>
			<CalendarNav />
			<CalendarMonth />
		</div>
	);
}
