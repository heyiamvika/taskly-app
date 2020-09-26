import React from 'react';

import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarNav } from '../CalendarNav/CalendarNav';

type Props = {};

export function Calendar(props: Props) {
	return (
		<div className='calendar'>
			<CalendarNav />
			<CalendarMonth />
		</div>
	);
}
