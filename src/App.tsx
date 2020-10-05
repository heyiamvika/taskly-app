import React, { useState } from 'react';
import './App.css';

import { Calendar } from './components/Calendar/Calendar';
import { DaySchedule } from './components/DaySchedule/DaySchedule';

function App() {
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
		<div className='App'>
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

export default App;
