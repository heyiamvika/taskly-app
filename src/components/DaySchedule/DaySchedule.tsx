import React from 'react';

import { DayScheduleHeader } from '../DayScheduleHeader/DayScheduleHeader';
import { EventCard } from '../EventCard/EventCard';

import './DaySchedule.css';

type Props = {
	visibleDay: Date;
	dayEvents: object | null;
	switchToPrevDay: () => void;
	switchToNextDay: () => void;
	onAddNewEventBtnClick: () => void;
};

export function DaySchedule({
	visibleDay,
	dayEvents,
	switchToPrevDay,
	switchToNextDay,
	onAddNewEventBtnClick,
}: Props) {
	if (dayEvents) console.log(Object.values(dayEvents));

	const renderEventCards = () => {
		if (dayEvents) {
			const events = Object.values(dayEvents);
			console.log(events);
			return events.map((event: Event, index: number) => (
				<EventCard key={index} calendarEvent={event} />
			));
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
					onAddNewEventBtnClick={onAddNewEventBtnClick}
				/>
			</div>
			<div className='day-events-wrapper'>
				{dayEvents ? renderEventCards() : renderNoEvents()}
			</div>
		</div>
	);
}
