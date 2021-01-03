import React from 'react';

import { LONG_MONTHS } from '../../utils/constants';

import './CalendarNav.css';

import { ButtonSize, ButtonDirection } from '../../utils/buttonOptions';
import { RoundArrowButton } from '../buttons/RoundArrowButton/RoundArrowButton';

import { useDispatch, useSelector } from 'react-redux';
import { changeDate, getVisibleDate } from '../../store/calendar';

export function CalendarNav() {
	const dispatch = useDispatch();
	const visibleDate = useSelector(getVisibleDate);

	const switchToPrevMonth = () => {
		dispatch(
			changeDate(
				new Date(visibleDate.getFullYear(), visibleDate.getMonth() - 1),
			),
		);
	};

	const switchToNextMonth = () => {
		dispatch(
			changeDate(
				new Date(
					visibleDate.getFullYear(),
					visibleDate.getMonth() + 1,
					visibleDate.getDate(),
				),
			),
		);
	};

	return (
		<div className='calendar-nav'>
			<span className='month-title'>
				{LONG_MONTHS[visibleDate.getMonth()]}, {visibleDate.getFullYear()}
			</span>
			<RoundArrowButton
				size={ButtonSize.Small}
				direction={ButtonDirection.Left}
				onButtonClick={switchToPrevMonth}
			/>
			<RoundArrowButton
				size={ButtonSize.Small}
				direction={ButtonDirection.Right}
				onButtonClick={switchToNextMonth}
			/>
		</div>
	);
}
