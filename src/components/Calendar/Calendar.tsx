import React, { useState } from 'react';
import './Calendar.css';

type Props = {};

export function Calendar(props: Props) {
	const [date, setDate] = useState(new Date());

	const daysOfTheWeek = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
	const longMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const getFirstDayOfMonthAsWeekday = (): number => {
		return new Date(date.getFullYear(), date.getMonth(), 0).getDay();
	};

	const getDaysInMonth = (): number => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const renderDaysOfTheWeek = (): JSX.Element[] => {
		return daysOfTheWeek.map((day) => (
			<th className='calendar-day-of-the-week' key={day}>
				{day}
			</th>
		));
	};

	const renderDays = (): JSX.Element[] => {
		const days = [];
		const blankDays = getFirstDayOfMonthAsWeekday();
		const totalDays = getDaysInMonth();

		for (let i = 0; i < totalDays + blankDays; i++) {
			days.push(
				i < blankDays ? (
					<td key={i} className='calendar-day empty'>
						{''}
					</td>
				) : (
					<td
						key={i}
						className={
							date.getDate() === i ? 'calendar-day today' : 'calendar-day'
						}>
						{i - blankDays + 1}
					</td>
				),
			);
		}

		return days;
	};

	const renderMonth = () => {
		const totalDays = renderDays();
		const rows: JSX.Element[][] = [];
		let currentRow: JSX.Element[] = [];

		totalDays.forEach((day, i) => {
			if (i % 7 !== 0) {
				currentRow.push(day); // if index not equal 7 that means not go to next week
			} else {
				rows.push(currentRow); // when reach next week we contain all td in last week to rows
				currentRow = []; // empty container
				currentRow.push(day); // in current loop we still push current row to new container
			}
			if (i === totalDays.length - 1) {
				// when end loop we add remain date
				rows.push(currentRow);
			}
		});

		return rows.map((row, index) => (
			<tr className='calendar-week' key={index}>
				{row}
			</tr>
		));
	};

	return (
		<div className='calendar'>
			<div className='calendar-nav'>
				<span>
					{longMonths[date.getMonth()]}, {date.getFullYear()}
				</span>
			</div>
			<table className='calendar-dates'>
				<thead className='calendar-weekdays'>
					<tr>{renderDaysOfTheWeek()}</tr>
				</thead>
				<tbody className='calendar-days'>{renderMonth()}</tbody>
			</table>
		</div>
	);
}
