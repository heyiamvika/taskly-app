import React from 'react';

import { DayScheduleHeader } from '../DayScheduleHeader/DayScheduleHeader';

import './DaySchedule.css';

type Props = {
	visibleDay: Date;
};

export function DaySchedule({ visibleDay }: Props) {
	return (
		<div className='day-schedule'>
			<DayScheduleHeader visibleDay={visibleDay} />
		</div>
	);
}
