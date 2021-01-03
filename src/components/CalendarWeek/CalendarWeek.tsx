import React from 'react';

import { CalendarDay } from '../CalendarDay/CalendarDay';

import './CalendarWeek.css';

import { useSelector } from 'react-redux';
import { getWeekValues, getWeekEventsBooleans } from '../../store/calendar';

type Props = {
	weekIndex: number;
};

export function CalendarWeek({ weekIndex }: Props) {
	const weekValues = useSelector(getWeekValues(weekIndex));
	const weekEventsBooleans = useSelector(getWeekEventsBooleans(weekIndex));

	const renderDaysOfTheWeek = () => {
		return weekValues.map((value, index) => (
			<CalendarDay
				key={`${String(value)} ${String(index)}`}
				value={weekValues[index]}
				hasEvents={weekEventsBooleans[index]}
			/>
		));
	};

	return <tr className='calendar-week'>{renderDaysOfTheWeek()}</tr>;
}
