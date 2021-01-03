import React from 'react';

import './Calendar.css';

import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarNav } from '../CalendarNav/CalendarNav';

import { useDispatch, useSelector } from 'react-redux';
import { changeDate, getVisibleDate } from '../../store/calendar';

export function Calendar() {
	const dispatch = useDispatch();
	const visibleDate = useSelector(getVisibleDate);

	const switchToPrevMonth = () => {
		dispatch(
			changeDate(
				new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1),
			),
		);
	};

	const switchToNextMonth = () => {
		dispatch(
			changeDate(
				new Date(
					visibleDate.getFullYear(),
					visibleDate.getMonth() + 1,
					visibleDate.getDate(),
				),
			),
		);
	};

	return (
		<div className='calendar'>
			<CalendarNav
				visibleDate={visibleDate}
				toPrevMonth={switchToPrevMonth}
				toNextMonth={switchToNextMonth}
			/>
			<CalendarMonth />
		</div>
	);
}
