import React from 'react';

import { CalendarWeek } from '../CalendarWeek/CalendarWeek';
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays';

import './CalendarMonth.css';

import { useSelector } from 'react-redux';
import { getWeeksCountInVisibleMonth } from '../../store/calendar';

export function CalendarMonth() {
	const weeksCount = useSelector(getWeeksCountInVisibleMonth);

	const renderVisibleMonth = () =>
		Array.from(Array(weeksCount).keys()).map((week, index) => (
			<CalendarWeek key={`week ${index}`} weekIndex={index} />
		));

	return (
		<table className='calendar-month'>
			<CalendarWeekdays />
			<tbody className='calendar-days'>{renderVisibleMonth()}</tbody>
		</table>
	);
}
