import React, { useState, useEffect } from 'react';

import './TimePicker.css';

import {
	TWELVE_HOUR_CLOCK_HOURS,
	MINUTES,
	DAY_PERIODS,
} from '../../../utils/constants';

type Props = {
	title: string;
	emoji: string;
	eventDate: Date;
	keyOnSelectChange: string;
	onSelectChange: <Type>(newValue: Type, key: string) => void;
};

type State = {
	hours: number;
	minutes: number;
	dayPeriod: 'AM' | 'PM';
};

export function TimePicker({
	title,
	emoji,
	eventDate,
	keyOnSelectChange,
	onSelectChange,
}: Props) {
	const [time, setTime] = useState<State>({
		hours: 7,
		minutes: 0,
		dayPeriod: 'AM',
	});

	const { hours, minutes, dayPeriod } = time;

	useEffect(() => {
		const clock24Hour = makeCloc24FromClock12Hours(hours, dayPeriod);
		const clock24Minutes = minutes === 0 ? '00' : minutes;

		const newTimeString = `${eventDate.getFullYear()}-${
			eventDate.getMonth() + 1
		}-${eventDate.getDate()}T${clock24Hour}:${clock24Minutes}:00`;

		onSelectChange(newTimeString, keyOnSelectChange);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hours, minutes, dayPeriod, eventDate]);

	const makeCloc24FromClock12Hours = (hour: number, dayPeriod: 'AM' | 'PM') => {
		const HOURS_IN_DAY_PERIOD: number = 12;

		if (dayPeriod === 'AM' && hour < 10) return `0${hour}`;
		if (dayPeriod === 'PM') return String(Number(hour) + HOURS_IN_DAY_PERIOD);

		return String(hour);
	};

	const changeTime = (newValue: string, key: string) => {
		setTime({ ...time, [key]: newValue });
	};

	const getHours = () => {
		return TWELVE_HOUR_CLOCK_HOURS.map((hour: number) => (
			<option key={hour} value={hour}>
				{hour}
			</option>
		));
	};

	const getMinutes = () => {
		return MINUTES.map((minute: number) => (
			<option key={minute} value={minute}>
				{minute < 10 ? `0${minute}` : minute}
			</option>
		));
	};

	const getDayPeriods = () => {
		return DAY_PERIODS.map((period: string) => (
			<option key={period} value={period}>
				{period}
			</option>
		));
	};

	return (
		<div className='time-picker'>
			<span className='time-icon' role='img' aria-label='time-emoji'>
				{emoji}
			</span>
			<span className='time-picker-title'>{title}</span>
			<div className='time-picker-select-wrapper'>
				<select
					value={hours}
					className='time-picker-select'
					name='hours'
					onChange={(e) => changeTime(e.target.value, e.target.name)}>
					{getHours()}
				</select>
				<span className='time-picker-select-divider'>:</span>
				<select
					value={minutes}
					className='time-picker-select'
					name='minutes'
					onChange={(e) => changeTime(e.target.value, e.target.name)}>
					{getMinutes()}
				</select>
				<select
					value={dayPeriod}
					className='time-picker-select'
					name='dayPeriod'
					onChange={(e) => changeTime(e.target.value, e.target.name)}>
					{getDayPeriods()}
				</select>
			</div>
		</div>
		// <input
		// 	name={name}
		// 	value={value}
		// 	onChange={(e) => onChange<string>(e.target.value, e.target.name)}
		// 	type={inputType}
		// 	placeholder={placeholder}
		// 	className={`basic-input ${color}`}
		// />
	);
}
