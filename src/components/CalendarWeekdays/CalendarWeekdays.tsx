import React from 'react';

import './CalendarWeekdays.css';

type Props = {};

const DAYS_OF_THE_WEEK: string[] = [
	'Mon',
	'Tue',
	'Wen',
	'Thu',
	'Fri',
	'Sat',
	'Sun',
];

export function CalendarWeekdays(props: Props) {
	const renderDaysOfTheWeek = (): JSX.Element[] => {
		return DAYS_OF_THE_WEEK.map((day) => (
			<th className='calendar-day-of-the-week' key={day}>
				{day}
			</th>
		));
	};

	return (
		<thead className='calendar-weekdays'>
			<tr>{renderDaysOfTheWeek()}</tr>
		</thead>
	);
}
