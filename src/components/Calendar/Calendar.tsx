import React from 'react';

import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarNav } from '../CalendarNav/CalendarNav';

type Props = {
	currentDate: Date;
	visibleDate: Date;
	switchToPrevMonth: () => void;
	switchToNextMonth: () => void;
	onDayChoose: (value: Date | undefined) => void;
};

export function Calendar({
	currentDate,
	visibleDate,
	switchToPrevMonth,
	switchToNextMonth,
	onDayChoose,
}: Props) {
	return (
		<div className='calendar'>
			<CalendarNav
				date={visibleDate}
				toPrevMonth={switchToPrevMonth}
				toNextMonth={switchToNextMonth}
			/>
			<CalendarMonth
				visibleDate={visibleDate}
				currentDate={currentDate}
				onDayChoose={onDayChoose}
			/>
		</div>
	);
}
