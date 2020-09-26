import React from 'react';
import './CalendarDay.css';

type Props = {
	day: number;
	today: boolean;
};

export function CalendarDay(props: Props) {
	const getDayClass = () => {
		return `calendar-day ${props.today ? 'today' : ''} ${
			props.day === 0 ? 'empty' : ''
		}`;
	};

	return <td className={getDayClass()}>{props.day === 0 ? '' : props.day}</td>;
}
