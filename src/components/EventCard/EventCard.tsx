import React from 'react';

import './EventCard.css';

type Event = {
	startTime: string;
	finishTime: string;
	name: string;
	notes: string;
	isPinned: boolean;
};

type Props = {
	calendarEvent: Event;
};

export function EventCard({
	calendarEvent: { name, notes, startTime, finishTime },
}: Props) {
	const makeStringFromTimeString = (timeString: string) => {
		const date = new Date(timeString);
		const hour = date.getHours();
		const minute = date.getMinutes();

		return `${hour}:${minute < 10 ? '0' : ''}${minute} ${
			hour < 12 ? 'AM' : 'PM'
		}`;
	};

	return (
		<div className='event-card' key={name}>
			<div className='event-information'>
				<h4 className='event-card-name'>{name}</h4>
				<p className='event-notes'>{notes}</p>
			</div>
			<div className='event-time'>
				<span>{makeStringFromTimeString(startTime)}</span>
				<span>{makeStringFromTimeString(finishTime)}</span>
			</div>
		</div>
	);
}
