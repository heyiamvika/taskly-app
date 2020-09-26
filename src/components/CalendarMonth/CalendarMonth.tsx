import React, { useState } from 'react';

import { CalendarWeek } from '../CalendarWeek/CalendarWeek';
import { CalendarWeekdays } from '../CalendarWeekdays/CalendarWeekdays';

import './CalendarMonth.css';

type Props = {};

const DAYS_IN_WEEK: number = 7;

export function CalendarMonth(props: Props) {
	const [date, setDate] = useState(new Date());

	const getFirstDayOfMonthAsWeekday = (): number =>
		new Date(date.getFullYear(), date.getMonth(), 0).getDay();

	const getDaysInMonthCount = (): number =>
		new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

	const getWeeksCountInMonth = (
		blankDaysCount: number,
		daysInMonthCount: number,
	): number => {
		const weeksCount = Math.floor(
			(blankDaysCount + daysInMonthCount) / DAYS_IN_WEEK,
		);
		const lastWeek = Number(
			(blankDaysCount + daysInMonthCount) % DAYS_IN_WEEK > 0,
		);

		return weeksCount + lastWeek;
	};

	const getDaysValues = (
		blankDaysCount: number,
		daysInMonthCount: number,
	): number[] => {
		const days = [];

		for (let i = 0; i < blankDaysCount; i++) days.push(0);
		for (let i = 0; i < daysInMonthCount; i++) days.push(i + 1);

		return days;
	};

	const getDaysValuesInWeek = (
		weekIndex: number,
		daysValues: number[],
	): number[] => {
		const days = [];

		for (let i = 0; i < 7; i++) {
			days.push(daysValues[i + DAYS_IN_WEEK * weekIndex]);
		}

		return days;
	};

	const renderMonth = () => {
		const blankDaysCount = getFirstDayOfMonthAsWeekday();
		const totalDaysCount = getDaysInMonthCount();

		const daysValues = getDaysValues(blankDaysCount, totalDaysCount);
		const weeksCount = getWeeksCountInMonth(blankDaysCount, totalDaysCount);
		const weeks = [];

		for (let i = 0; i < weeksCount; i++) {
			weeks.push(
				<CalendarWeek
					key={`week ${i}`}
					daysValues={getDaysValuesInWeek(i, daysValues)}
				/>,
			);
		}

		return weeks;
	};

	return (
		<table className='calendar-month'>
			<CalendarWeekdays />
			<tbody className='calendar-days'>{renderMonth()}</tbody>
		</table>
	);
}
