import React from 'react';

import { CalendarWeek } from '../CalendarWeek/CalendarWeek';
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays';

import { DAYS_IN_WEEK } from '../../utils/constants';

import './CalendarMonth.css';

import { useSelector } from 'react-redux';
import {
	getDaysValuesInVisibleMonth,
	getWeeksCountInVisibleMonth,
} from '../../store/calendar';

export function CalendarMonth() {
	const daysValues = useSelector(getDaysValuesInVisibleMonth);
	const weeksCount = useSelector(getWeeksCountInVisibleMonth);

	// TO_DO: also move to selectors
	const getDaysValuesInWeek = (
		weekIndex: number,
		daysValues: (Date | undefined)[],
	) =>
		Array.from(Array(DAYS_IN_WEEK)).map(
			(day, i) => daysValues[i + DAYS_IN_WEEK * weekIndex],
		);

	const renderVisibleMonth = () => {
		const weeks = [];
		for (let i = 0; i < weeksCount; i++) {
			weeks.push(
				<CalendarWeek
					key={`week ${i}`}
					daysValues={getDaysValuesInWeek(i, daysValues)}
				/>,
			);
		}
		return weeks;
	};

	return (
		<table className='calendar-month'>
			<CalendarWeekdays />
			<tbody className='calendar-days'>{renderVisibleMonth()}</tbody>
		</table>
	);
}
