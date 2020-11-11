import { Calendar, CalendarEvent } from './storeTypes';
import { createSlice } from '@reduxjs/toolkit';

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

// helper functions
const isDayEmpty = (dayEvents: CalendarEvent[]): boolean =>
	dayEvents.length === 0;

const hasDateInCalendar = (calendar: Calendar, date: string): boolean =>
	calendar.hasOwnProperty(date);
