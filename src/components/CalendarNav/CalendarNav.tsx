import React from 'react';

import './CalendarNav.css';

import arrowLeft from '../../assets/arrow_left.png';
import arrowRight from '../../assets/arrow_right.png';

type Props = {
	toPrevMonth: () => void;
	toNextMonth: () => void;
	date: Date;
};

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

export function CalendarNav({ date, toPrevMonth, toNextMonth }: Props) {
	return (
		<div className='calendar-nav'>
			<span className='month-title'>
				{LONG_MONTHS[date.getMonth()]}, {date.getFullYear()}
			</span>
			<button className='change-month-btn' onClick={toPrevMonth}>
				<img src={arrowLeft} alt='to-previous-month' />
			</button>
			<button className='change-month-btn' onClick={toNextMonth}>
				<img src={arrowRight} alt='to-next-month' />
			</button>
		</div>
	);
}
