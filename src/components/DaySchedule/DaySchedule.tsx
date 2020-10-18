import React from 'react';

import { DayScheduleHeader } from '../DayScheduleHeader/DayScheduleHeader';

import './DaySchedule.css';

type Props = {
	visibleDay: Date;
	dayEvents: object | null;
};

export function DaySchedule({ visibleDay, dayEvents }: Props) {
	console.log('dayEvents', dayEvents);
	return (
		<div className='day-schedule'>
			<DayScheduleHeader visibleDay={visibleDay} />
		</div>
	);
}
