import { Store, Calendar, CalendarEvent } from './storeTypes';
import { createSlice } from '@reduxjs/toolkit';

// temporary
let nextId = 0;

const initialState: Store = {
	currentUser: null,
	calendar: {},
};

const slice = createSlice({
	name: 'app',
	initialState,
	reducers: {
		newEventAdded: (state, action) => {
			const { calendar } = state;
			const { eventDate, newEvent } = action.payload;
			const eventToAdd = { ...newEvent, id: ++nextId };

			if (!hasDateInCalendar(calendar, eventDate)) {
				calendar[eventDate] = [];
			}

			calendar[eventDate].push(eventToAdd);
		},
		eventDeleted: (state, action) => {
			const { calendar } = state;
			const { eventDate, id } = action.payload;

			calendar[eventDate] = calendar[eventDate].filter(
				(event) => event.id !== id,
			);

			if (isDayEmpty(calendar[eventDate])) {
				delete calendar[eventDate];
			}
		},
		eventDetailsChanged: (state, action) => {
			const { calendar } = state;
			const { eventDate, id, changedEvent } = action.payload;
			const eventToChange = { ...changedEvent, id };

			calendar[eventDate] = calendar[eventDate].map((event) =>
				event.id === id ? eventToChange : event,
			);
		},
	},
});

export const {
	newEventAdded,
	eventDeleted,
	eventDetailsChanged,
} = slice.actions;
export default slice.reducer;

// helper functions
const isDayEmpty = (dayEvents: CalendarEvent[]): boolean =>
	dayEvents.length === 0;

const hasDateInCalendar = (calendar: Calendar, date: string): boolean =>
	calendar.hasOwnProperty(date);
