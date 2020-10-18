import React from 'react';

import { DayScheduleHeader } from '../DayScheduleHeader/DayScheduleHeader';
import { EventCard } from '../EventCard/EventCard';

import './DaySchedule.css';

type Event = {
	startTime: string;
	finishTime: string;
	name: string;
	notes: string;
	isPinned: boolean;
};

type Props = {
	visibleDay: Date;
	dayEvents: object | null;
	switchToPrevDay: () => void;
	switchToNextDay: () => void;
};

export function DaySchedule({
	visibleDay,
	dayEvents,
	switchToPrevDay,
	switchToNextDay,
}: Props) {
	if (dayEvents) console.log(Object.values(dayEvents));

	const renderEventCards = () => {
		if (dayEvents) {
			const events = Object.values(dayEvents);
			return events.map((event: Event) => <EventCard calendarEvent={event} />);
		}
	};

	const renderNoEvents = () => {
		return (
			<span className='no-events-text'>You have no events on this day!</span>
		);
	};

	return (
		<div className='day-schedule'>
			<div className='day-schedule-header-wrapper'>
				<DayScheduleHeader
					visibleDay={visibleDay}
					onPrevDayBtnClick={switchToPrevDay}
					onNextDayBtnClick={switchToNextDay}
				/>
			</div>
			<div className='day-events-wrapper'>
				{dayEvents ? renderEventCards() : renderNoEvents()}
			</div>
		</div>
	);
}
