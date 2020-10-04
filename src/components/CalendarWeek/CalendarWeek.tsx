import React, { useState } from 'react';

import { CalendarDay } from '../CalendarDay/CalendarDay';

import './CalendarWeek.css';

type Props = {
	// Question: is there more elegant way to accept array of fixed size?
	daysValues: readonly number[];
	currentDate: Date;
};

export function CalendarWeek({ daysValues, currentDate }: Props) {
	const renderDaysOfTheWeek = () => {
		return daysValues.map((value, index) => (
			<CalendarDay
				key={`${String(value)} ${String(index)}`}
				day={value}
				today={false}
			/>
		));
	};

	return <tr className='calendar-week'>{renderDaysOfTheWeek()}</tr>;
}
