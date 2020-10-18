import React from 'react';

import { FULL_DAYS_OF_THE_WEEK } from '../../utils/constants';
import { AddNewEventButton } from '../buttons/AddNewEventButton/AddNewEventButton';

import './DayScheduleHeader.css';

type Props = {
	visibleDay: Date;
};

export function DayScheduleHeader({ visibleDay }: Props) {
	return (
		<div className='day-schedule-header'>
			<div className='day-schedule-wrapper'>
				<span className='day-schedule-header-heading'>Today's schedule</span>
				<div className='day-schedule-header-active-day'>
					<span className='day-schedule-header-heading active-day-heading'>{`${
						FULL_DAYS_OF_THE_WEEK[visibleDay.getDay()]
					} ${visibleDay.getDate()}`}</span>
				</div>
			</div>
			<AddNewEventButton />
		</div>
	);
}
