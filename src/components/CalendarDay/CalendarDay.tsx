import React from 'react';

import './CalendarDay.css';

import { useDispatch, useSelector } from 'react-redux';
import {
	changeDate,
	getCurrentDate,
	getVisibleDate,
} from '../../store/calendar';

type Props = {
	value: Date | undefined;
	hasEvents: boolean;
};

export function CalendarDay({ value, hasEvents }: Props) {
	const dispatch = useDispatch();
	const currentDate = useSelector(getCurrentDate);
	const visibleDate = useSelector(getVisibleDate);

	const onDayChoose = (value: Date) => dispatch(changeDate(value));

	const getDayClass = () => {
		const todayClass =
			value && value.toDateString() === currentDate.toDateString()
				? 'today'
				: '';

		const chosenDayClass =
			value && value.toDateString() === visibleDate.toDateString()
				? 'chosen-day'
				: '';

		const hasEventsClass = hasEvents ? 'has-events-day' : 'no-events-day';

		return `calendar-day ${todayClass} ${chosenDayClass} ${hasEventsClass}`;
	};

	const getPointClass = () => {
		const hasEventsClass = hasEvents ? 'has-events-point' : 'no-events-point';
		const todayClass =
			value && value.toDateString() === currentDate.toDateString() && hasEvents
				? 'has-events-today-point'
				: '';

		return `events-point ${hasEventsClass} ${todayClass}`;
	};

	return (
		<div className={getDayClass()} onClick={() => value && onDayChoose(value)}>
			<td>{value ? value.getDate() : ''}</td>
			<span className={getPointClass()}></span>
		</div>
	);
}
