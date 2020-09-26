import React, { useState } from 'react';

import './CalendarNav.css';

type Props = {};

const LONG_MONTHS: string[] = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export function CalendarNav(props: Props) {
	const [date, setDate] = useState(new Date());

	return (
		<div className='calendar-nav'>
			<span>
				{LONG_MONTHS[date.getMonth()]}, {date.getFullYear()}
			</span>
		</div>
	);
}
