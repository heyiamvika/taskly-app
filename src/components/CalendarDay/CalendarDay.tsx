import React from 'react';
import './CalendarDay.css';

type Props = {
	value: Date | undefined;
	currentDate: Date;
	visibleDate: Date;
	onDayChoose: (value: Date | undefined) => void;
};

export function CalendarDay({
	value,
	currentDate,
	visibleDate,
	onDayChoose,
}: Props) {
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
		<td className={getDayClass()} onClick={() => onDayChoose(value)}>
			{value ? value.getDate() : ''}
		</td>
	);
}
