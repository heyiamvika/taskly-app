import React from 'react';

import './CalendarNav.css';

import { ButtonSize, ButtonDirection } from '../../utils/buttonOptions';
import { LONG_MONTHS } from '../../utils/constants';
import { RoundArrowButton } from '../buttons/RoundArrowButton/RoundArrowButton';

type Props = {
	toPrevMonth: () => void;
	toNextMonth: () => void;
	visibleDate: Date;
};

export function CalendarNav({ visibleDate, toPrevMonth, toNextMonth }: Props) {
	return (
		<div className='calendar-nav'>
			<span className='month-title'>
				{LONG_MONTHS[visibleDate.getMonth()]}, {visibleDate.getFullYear()}
			</span>
			<RoundArrowButton
				size={ButtonSize.Small}
				direction={ButtonDirection.Left}
				onButtonClick={toPrevMonth}
			/>
			<RoundArrowButton
				size={ButtonSize.Small}
				direction={ButtonDirection.Right}
				onButtonClick={toNextMonth}
			/>
		</div>
	);
}
