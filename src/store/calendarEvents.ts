import { Calendar, CalendarEvent, Store } from './storeTypes';
import { createSlice } from '@reduxjs/toolkit';

import { createSelector } from 'reselect';

import { MAX_DAYS_IN_MONTH } from '../utils/constants';

// temporary
let nextId = 0;
const initialState: Calendar = {};

const calendarEventsSlice = createSlice({
	name: 'calendarEvents',
	initialState,
	reducers: {
		newEventAdded: (calendarEvents: Calendar, action) => {
			const { eventDate, newEvent } = action.payload;
			const eventToAdd = { ...newEvent, id: ++nextId };

			if (!hasDateInCalendar(calendarEvents, eventDate)) {
				calendarEvents[eventDate] = [];
			}

			calendarEvents[eventDate].push(eventToAdd);
		},
		eventDeleted: (calendarEvents: Calendar, action) => {
			const { eventDate, id } = action.payload;

			calendarEvents[eventDate] = calendarEvents[eventDate].filter(
				(event) => event.id !== id,
			);

			if (isDayEmpty(calendarEvents[eventDate])) {
				delete calendarEvents[eventDate];
			}
		},
		eventDetailsChanged: (calendarEvents: Calendar, action) => {
			const { eventDate, id, changedEvent } = action.payload;
			const eventToChange = { ...changedEvent, id };

			calendarEvents[eventDate] = calendarEvents[eventDate].map((event) =>
				event.id === id ? eventToChange : event,
			);
		},
	},
});

export const {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
} = calendarEventsSlice.actions;
export default calendarEventsSlice.reducer;

// Selectors

// I'm using createSelector from 'reselect' to
// memoize data and not recalculate it very time
export const getEventsForDate = createSelector(
	(state: Store) => state.entities.calendarEvents,
	(calendarEvents) => (date: string) => calendarEvents[date],
);

export const getEventsBooleansForMonth = createSelector(
	(state: Store) => state,
	(state) => (year: string, month: string) => {
		const monthEventsExist: {
			[key: number]: boolean;
		} = {};

		for (let i = 0; i < MAX_DAYS_IN_MONTH; i++) {
			const eventsForDate = getEventsForDate(state)(`${i}/${month}/${year}`);

			console.log(eventsForDate, i, month, year);
			monthEventsExist[i] = Boolean(eventsForDate);
		}

		return monthEventsExist;
	},
);

// helper functions
const isDayEmpty = (dayEvents: CalendarEvent[]): boolean =>
	dayEvents.length === 0;

const hasDateInCalendar = (calendar: Calendar, date: string): boolean =>
	calendar.hasOwnProperty(date);
