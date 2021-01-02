import { createSlice, PayloadAction, ThunkAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { isObjectEmpty } from '../utils/helperFunctions';

import * as firebaseActions from './firebase/firebaseActions';
import {
	createEventsRef,
	createAttendeesRef,
} from './firebase/firebaseRefCreators';

import { StoreDispatch, StoreGetState } from './store';

import {
	CalendarState,
	UserEvents,
	Event,
	MonthEvents,
	DayEvents,
} from './store-types/calendar';
import { RootState } from './store-types/root';

const initialState: CalendarState = {
	events: {},
	loading: false,
	isSubscribed: false,
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		eventsChangesRequested: (state: CalendarState) => {
			state.loading = true;
		},
		eventsChangesRequestFailed: (state: CalendarState) => {
			state.loading = false;
		},
		eventsUpdated: (
			state: CalendarState,
			action: PayloadAction<UserEvents>,
		) => {
			state.events = action.payload;
			state.loading = false;
		},
		subscribedToEvents: (state: CalendarState) => {
			state.isSubscribed = true;
		},
	},
});

const {
	eventsChangesRequested,
	eventsChangesRequestFailed,
	eventsUpdated,
	subscribedToEvents,
} = calendarSlice.actions;
export default calendarSlice.reducer;

// TO_DO: something wrong with types!
// Action creators
export const subscribeToUserEvents = (uid: string) => (
	dispatch: StoreDispatch,
	getState: StoreGetState,
) => {
	const { isSubscribed } = getState().calendar;
	if (isSubscribed) return;

	// TO_DO: get user id from auth.user.id
	const ref = createEventsRef({ uid });

	dispatch(
		firebaseActions.subscribeDatabaseCallBegan({
			ref,
			onSuccess: eventsUpdated.type,
			onStart: eventsChangesRequested.type,
			onError: eventsChangesRequestFailed.type,
		}),
	);

	dispatch(subscribedToEvents());
};

export const addNewEvent = (
	uid: string,
	year: string,
	month: string,
	day: string,
	event: Event,
) => {
	const ref = createEventsRef({ uid, year, month, day });
	const eventToAdd = { ...event, isPinned: false };

	return firebaseActions.addItemCallBegun({
		ref,
		item: eventToAdd,
	});
};

export const updateEvent = (
	uid: string,
	year: string,
	month: string,
	day: string,
	eventKey: string,
	updatedEvent: Event,
) => {
	const ref = createEventsRef({ uid, year, month, day, eventKey });

	return firebaseActions.updateItemCallBegun({
		ref,
		updatedEvent,
	});
};

export const removeEvent = (
	uid: string,
	year: string,
	month: string,
	day: string,
	eventKey: string,
) => {
	const ref = createEventsRef({ uid, year, month, day, eventKey });

	return firebaseActions.removeItemCallBegun({
		ref,
	});
};

export const pinEvent = (
	uid: string,
	year: string,
	month: string,
	day: string,
	eventKey: string,
	event: Event,
) => {
	const ref = createEventsRef({ uid, year, month, day, eventKey });
	const updatedEvent: Event = { ...event, isPinned: true };

	return firebaseActions.updateItemCallBegun({ ref, updatedEvent });
};

export const unpinEvent = (
	uid: string,
	year: string,
	month: string,
	day: string,
	eventKey: string,
	event: Event,
) => {
	const ref = createEventsRef({ uid, year, month, day, eventKey });
	const updatedEvent: Event = { ...event, isPinned: false };

	return firebaseActions.updateItemCallBegun({ ref, updatedEvent });
};

// Collaboration!!
// export const addNewAttendee = (
// 	attendeeEmail,
// 	uid,
// 	year,
// 	month,
// 	day,
// 	eventKey,
// ) => {
// 	// Google's ADMIN SDK (backend) needed:
// 	// https://firebase.google.com/docs/auth/admin/manage-users
// 	// const ref = createAttendeesRef({ uid, year, month, day, eventKey });
// 	// return firebaseActions.addItemCallBegun({
// 	// 	ref,
// 	// 	item: attendee,
// 	// });
// };

// export const removeAttendee = () => {
// };

// Selectors
export const getDaysWithEvents = (year: string, month: string) =>
	createSelector(
		(state: RootState) => state.calendar.events,
		(events: UserEvents) => {
			const result = [];

			if (!isObjectEmpty(events)) {
				const monthlyEvents = events[year][month];
				for (const day in monthlyEvents) {
					if (!isObjectEmpty(monthlyEvents[day])) result.push(day);
				}
			}

			return result;
		},
	);

export const getYearEvents = (year: string) =>
	createSelector(
		(state: RootState) => state.calendar.events,
		(events: UserEvents) => (events.hasOwnProperty(year) ? events[year] : []),
	);

// export const getMonthEvents = (year: string, month: string) =>
// 	createSelector(getYearEvents(year), (yearEvents: UserEvents) =>
// 		yearEvents.hasOwnProperty(month) ? yearEvents[month] : [],
// 	);

// export const getDayEvents = (year: string, month: string, day: string) =>
// 	createSelector(
// 		getMonthEvents(year, month),
// 		(monthEvents: MonthEvents) => monthEvents[day] || [],
// 	);

// export const getEventByKey = (
// 	year: string,
// 	month: string,
// 	day: string,
// 	eventKey: string,
// ) =>
// 	createSelector(
// 		getDayEvents(year, month, day),
// 		(dayEvents: DayEvents) => dayEvents[eventKey] || [],
// 	);

// Helper functions
const getDaysInMonthCount = (year: number, month: number) =>
	new Date(year, month, 0).getDate();
