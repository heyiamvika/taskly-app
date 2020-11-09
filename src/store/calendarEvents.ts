import { Store, Calendar, CalendarEvent } from './storeTypes';
import { createAction, createReducer } from '@reduxjs/toolkit';

// Action creators (Redux DevTools);
export const newEventAdded = createAction<{
	eventDate: string;
	newEvent: CalendarEvent;
}>('NEW_EVENT_ADDED');

export const eventDeleted = createAction<{
	eventDate: string;
	id: number;
}>('EVENT_DELETED');

export const eventDetailsChanged = createAction<{
	eventDate: string;
	id: number;
	changedEvent: CalendarEvent;
}>('EVENT_DETAILS_CHANGED');

// temporary
let nextId = 0;

const initialStore: Store = {
	currentUser: null,
	calendar: {},
};

export default createReducer(initialStore, {
	[newEventAdded.type]: (state, action) => {
		const { calendar } = state;
		const { eventDate, newEvent } = action.payload;
		const eventToAdd = { ...newEvent, id: ++nextId };

		if (!hasDateInCalendar(calendar, eventDate)) {
			calendar[eventDate] = [];
		}

		calendar[eventDate].push(eventToAdd);
	},
	[eventDeleted.type]: (state, action) => {
		const { calendar } = state;
		const { eventDate, id } = action.payload;

		calendar[eventDate] = calendar[eventDate].filter(
			(event) => event.id !== id,
		);

		if (isDayEmpty(calendar[eventDate])) {
			delete calendar[eventDate];
		}
	},
	[eventDetailsChanged.type]: (state, action) => {
		const { calendar } = state;
		const { eventDate, id, changedEvent } = action.payload;

		calendar[eventDate] = calendar[eventDate].map((event) =>
			event.id === id ? changedEvent : event,
		);
	},
});

// helper functions
const isDayEmpty = (dayEvents: CalendarEvent[]): boolean =>
	dayEvents.length === 0;

const hasDateInCalendar = (calendar: Calendar, date: string): boolean =>
	calendar.hasOwnProperty(date);
