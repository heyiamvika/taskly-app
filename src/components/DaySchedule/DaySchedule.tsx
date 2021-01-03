import React from 'react';

import { DayScheduleHeader } from '../DayScheduleHeader/DayScheduleHeader';
import { EventCard } from '../EventCard/EventCard';

import './DaySchedule.css';

import { useSelector } from 'react-redux';
import { getVisibleDayEvents } from '../../store/calendar';
import { Event } from '../../store/store-types/calendar';

type Props = {
	onAddNewEventBtnClick: () => void;
};

export function DaySchedule({ onAddNewEventBtnClick }: Props) {
	const dayEvents = useSelector(getVisibleDayEvents);

	const renderEventCards = () => {
		if (dayEvents) {
			const events = Object.values(dayEvents);
			return events.map((event: Event, index: number) => (
				<EventCard key={index} calendarEvent={event} />
			));
		}
	};

	const renderNoEvents = () => (
		<span className='no-events-text'>You have no events on this day!</span>
	);

	return (
		<div className='day-schedule'>
			<div className='day-schedule-header-wrapper'>
				<DayScheduleHeader onAddNewEventBtnClick={onAddNewEventBtnClick} />
			</div>
			<div className='day-events-wrapper'>
				{dayEvents ? renderEventCards() : renderNoEvents()}
			</div>
		</div>
	);
}
