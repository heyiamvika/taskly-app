import React, { useState } from 'react';

import './HomePage.css';

import { Calendar } from '../../Calendar/Calendar';
import { DaySchedule } from '../../DaySchedule/DaySchedule';

export function HomePage() {
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
		<div className='home-page'>
			<Calendar
				currentDate={currentDate}
				visibleDate={visibleDate}
				switchToNextMonth={switchToNextMonth}
				switchToPrevMonth={switchToPrevMonth}
				onDayChoose={chooseDay}
			/>
			<DaySchedule visibleDay={visibleDate} />
		</div>
	);
}
