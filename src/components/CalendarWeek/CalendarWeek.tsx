import React from 'react';

import { CalendarDay } from '../CalendarDay/CalendarDay';

import './CalendarWeek.css';

type Props = {
	daysValues: readonly (Date | undefined)[];
	currentDate: Date;
};

export function CalendarWeek({ daysValues, currentDate }: Props) {
	const renderDaysOfTheWeek = () => {
		return daysValues.map((value, index) => (
			<CalendarDay
				key={`${String(value)} ${String(index)}`}
				value={value}
				today={currentDate}
			/>
		));
	};

	return <tr className='calendar-week'>{renderDaysOfTheWeek()}</tr>;
}
