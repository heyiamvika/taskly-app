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
};

export function CalendarDay({ value }: Props) {
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

		return `calendar-day ${todayClass} ${chosenDayClass}`;
	};

	return (
		<td className={getDayClass()} onClick={() => value && onDayChoose(value)}>
			{value ? value.getDate() : ''}
		</td>
	);
}
