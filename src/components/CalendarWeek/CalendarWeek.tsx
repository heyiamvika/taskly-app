import React from 'react';

import { CalendarDay } from '../CalendarDay/CalendarDay';

import './CalendarWeek.css';

type Props = {
	daysValues: readonly (Date | undefined)[];
	currentDate: Date;
	visibleDate: Date;
	onDayChoose: (value: Date | undefined) => void;
};

export function CalendarWeek({
	daysValues,
	currentDate,
	visibleDate,
	onDayChoose,
}: Props) {
	const renderDaysOfTheWeek = () => {
		return daysValues.map((value, index) => (
			<CalendarDay
				key={`${String(value)} ${String(index)}`}
				value={value}
				currentDate={currentDate}
				visibleDate={visibleDate}
				onDayChoose={onDayChoose}
			/>
		));
	};

	return <tr className='calendar-week'>{renderDaysOfTheWeek()}</tr>;
}
