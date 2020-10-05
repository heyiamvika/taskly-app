import React, { useState } from 'react';

import { CalendarMonth } from '../CalendarMonth/CalendarMonth';
import { CalendarNav } from '../CalendarNav/CalendarNav';

type Props = {};

export function Calendar(props: Props) {
	const [currentDate] = useState(new Date());
	const [visibleDate, setVisibleDate] = useState(currentDate);

	const switchToPrevMonth = () => {
		setVisibleDate(
			new Date(
				visibleDate.getFullYear(),
				visibleDate.getMonth() - 1,
				visibleDate.getDate(),
			),
		);
	};

	const switchToNextMonth = () => {
		setVisibleDate(
			new Date(
				visibleDate.getFullYear(),
				visibleDate.getMonth() + 1,
				visibleDate.getDate(),
			),
		);
	};

	const chooseDay = (value: Date | undefined) => {
		if (!value) return;
		setVisibleDate(value);
	};

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
				onDayChoose={chooseDay}
			/>
		</div>
	);
}
