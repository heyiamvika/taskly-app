import React from 'react';
import './CalendarDay.css';

type Props = {
	value: Date | undefined;
	today: Date;
};

export function CalendarDay({ value, today }: Props) {
	const getDayClass = () => {
		return `calendar-day ${
			value && value.toDateString() === today.toDateString() ? 'today' : ''
		} ${!value ? 'empty' : ''}`;
	};

	return <td className={getDayClass()}>{value ? value.getDate() : ''}</td>;
}
