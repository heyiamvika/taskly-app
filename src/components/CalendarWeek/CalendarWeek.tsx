import React from 'react';

import { CalendarDay } from '../CalendarDay/CalendarDay';

import './CalendarWeek.css';

type Props = {
	daysValues: readonly (Date | undefined)[];
};

export function CalendarWeek({ daysValues }: Props) {
	const renderDaysOfTheWeek = () => {
		return daysValues.map((value, index) => (
			<CalendarDay key={`${String(value)} ${String(index)}`} value={value} />
		));
	};

	return <tr className='calendar-week'>{renderDaysOfTheWeek()}</tr>;
}
