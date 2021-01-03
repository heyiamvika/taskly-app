import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { isObjectEmpty } from '../utils/helperFunctions';

import { DAYS_IN_WEEK } from '../utils/constants';

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
	currentDate: new Date(),
	visibleDate: new Date(),
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
		changeVisibleDate: (state: CalendarState, action: PayloadAction<Date>) => {
			const newDate: Date = action.payload;
			state.visibleDate = newDate;
		},
	},
});

const {
	eventsChangesRequested,
	eventsChangesRequestFailed,
	eventsUpdated,
	subscribedToEvents,
	changeVisibleDate,
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

export const changeDate = (newDate: Date) => changeVisibleDate(newDate);

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
export const getCurrentDate = createSelector(
	(state: RootState) => state.calendar.currentDate,
	(currentDate: Date) => currentDate,
);

export const getVisibleDate = createSelector(
	(state: RootState) => state.calendar.visibleDate,
	(visibleDate: Date) => visibleDate,
);

const getVisibleMonthBlankDaysCount = createSelector(
	(state: RootState) => state.calendar.visibleDate,
	(visibleDate: Date) =>
		new Date(visibleDate.getFullYear(), visibleDate.getMonth(), 0).getDay(),
);

const getDaysInVisibleMonthCount = createSelector(
	(state: RootState) => state.calendar.visibleDate,
	(visibleDate: Date) =>
		new Date(
			visibleDate.getFullYear(),
			visibleDate.getMonth() + 1,
			0,
		).getDate(),
);

export const getWeeksCountInVisibleMonth = createSelector(
	(state: RootState) => getVisibleMonthBlankDaysCount(state),
	(state: RootState) => getDaysInVisibleMonthCount(state),
	(blankDaysCount: number, totalDaysCount: number): number => {
		const weeksCount = Math.floor(
			(blankDaysCount + totalDaysCount) / DAYS_IN_WEEK,
		);
		const lastWeek = Number(
			(blankDaysCount + totalDaysCount) % DAYS_IN_WEEK > 0,
		);

		return weeksCount + lastWeek;
	},
);

export const getDaysValuesInVisibleMonth = createSelector(
	(state: RootState) => getVisibleMonthBlankDaysCount(state),
	(state: RootState) => getDaysInVisibleMonthCount(state),
	(state: RootState) => getVisibleDate(state),
	(state: RootState) => getWeeksCountInVisibleMonth(state),
	(
		blankDaysCount: number,
		totalDaysCount: number,
		visibleDate: Date,
		weeksCount: number,
	) => {
		const days: (Date | undefined)[] = [];
		const daysInWeeks: (Date | undefined)[][] = [];

		for (let i = 0; i < blankDaysCount; i++) days.push(undefined);
		for (let i = 0; i < totalDaysCount; i++)
			days.push(
				new Date(visibleDate.getFullYear(), visibleDate.getMonth(), i + 1),
			);

		for (let i = 0; i < weeksCount; i++) {
			daysInWeeks[i] = days.slice(
				i * DAYS_IN_WEEK,
				i * DAYS_IN_WEEK + DAYS_IN_WEEK,
			);
		}

		return daysInWeeks;
	},
);

export const getWeekValues = (weekIndex: number) =>
	createSelector(
		(state: RootState) => getDaysValuesInVisibleMonth(state),
		(monthValues) => monthValues[weekIndex],
	);

export const getDaysWithEvents = createSelector(
	(state: RootState) => state.calendar.events,
	(state: RootState) => state.calendar.visibleDate,
	(state: RootState) => getWeeksCountInVisibleMonth(state),
	(events: UserEvents, visibleDate: Date, weeksCount: number): boolean[][] => {
		const year = visibleDate.getFullYear();
		const month = visibleDate.getMonth();
		const result: boolean[] = [];
		const resultInWeeks: boolean[][] = [];

		if (!isObjectEmpty(events)) {
			const monthlyEvents = events[year][month];
			for (const day in monthlyEvents) {
				result.push(!isObjectEmpty(monthlyEvents[day]));
			}
		}

		for (let i = 0; i < weeksCount; i++) {
			resultInWeeks[i] = result.slice(
				i * DAYS_IN_WEEK,
				i * DAYS_IN_WEEK + DAYS_IN_WEEK,
			);
		}

		return resultInWeeks;
	},
);

export const getWeekEventsBooleans = (weekIndex: number) =>
	createSelector(
		(state: RootState) => getDaysWithEvents(state),
		(daysWithEvents) => daysWithEvents[weekIndex],
	);

// export const hasVisibleDayEvents = (dayIndex: number) =>
// 	createSelector(
// 		(state: RootState) => state.calendar.events,
// 		(events: UserEvents) => {},
// 	);

// export const getYearEvents = (year: string) =>
// 	createSelector(
// 		(state: RootState) => state.calendar.events,
// 		(events: UserEvents) => (events.hasOwnProperty(year) ? events[year] : []),
// 	);

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
