import React, { useState } from 'react';

import { CalendarDay } from '../CalendarDay/CalendarDay';

import './CalendarWeek.css';

type Props = {
	// Question: is there more elegant way to accept array of fixed size?
	daysValues: readonly number[];
};

export function CalendarWeek(props: Props) {
	const [date, setDate] = useState(new Date());

	const renderDaysOfTheWeek = () => {
		return props.daysValues.map((value, index) => (
			<CalendarDay
				key={`${String(value)} ${String(index)}`}
				day={value}
				today={date.getDate() === value}
			/>
		));
	};

	return <tr className='calendar-week'>{renderDaysOfTheWeek()}</tr>;
}
