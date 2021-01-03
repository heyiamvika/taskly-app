import React from 'react';

import { EmojiIcon } from '../icons/EmojiIcon/EmojiIcon';

import './EventCard.css';

import { Event } from '../../store/store-types/calendar';

type Props = {
	calendarEvent: Event;
};

export function EventCard({ calendarEvent }: Props) {
	const { startTime, title, emoji, notes, finishTime } = calendarEvent;

	const makeStringFromTimeString = (timeString: string) => {
		const date = new Date(timeString);
		const hour = date.getHours();
		const minute = date.getMinutes();

		return `${hour}:${minute < 10 ? '0' : ''}${minute} ${
			hour < 12 ? 'AM' : 'PM'
		}`;
	};

	const getCardClass = () => {
		// TO_DO: this is not very effective, pass through props / context??
		const dateFromTimeString = new Date(startTime);
		const now = new Date();
		return dateFromTimeString > now ? 'future' : 'passed';
	};

	return (
		<div className={`event-card ${getCardClass()}`} key={title}>
			<EmojiIcon emoji={emoji} />
			<div className='event-information'>
				<h4 className='event-card-name'>{title}</h4>
				<p className='event-notes'>{notes}</p>
			</div>
			<div className='event-time'>
				<span>{makeStringFromTimeString(startTime)}</span>
				<span>{makeStringFromTimeString(finishTime)}</span>
			</div>
		</div>
	);
}
