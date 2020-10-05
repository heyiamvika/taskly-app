import React from 'react';

import { DAYS_OF_THE_WEEK } from '../../utils/constants';

import './CalendarWeekdays.css';

type Props = {};

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
