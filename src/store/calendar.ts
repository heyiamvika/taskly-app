import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import { isObjectEmpty } from '../utils/helperFunctions';
import { DAYS_IN_WEEK } from '../utils/constants';

import * as dbActions from './db/dbActions';

import { CalendarState, UserEvents, Event } from './store-types/calendar';
import { RootState } from './store-types/root';

const initialState: CalendarState = {
	currentDate: new Date(),
	visibleDate: new Date(),
	events: [],
};

const calendarSlice = createSlice({
	name: 'calendar',
	initialState,
	reducers: {
		eventsLoaded: (state: CalendarState, action: PayloadAction<UserEvents>) => {
			state.events = action.payload;
		},
		changeVisibleDate: (state: CalendarState, action: PayloadAction<Date>) => {
			const newDate: Date = action.payload;
			state.visibleDate = newDate;
		},
	},
});

const { eventsLoaded, changeVisibleDate } = calendarSlice.actions;
export default calendarSlice.reducer;

export const changeDate = (newDate: Date) => changeVisibleDate(newDate);

export const addNewEvent = (event: Event) => {
	const { title, notes, startTime, finishTime, emoji } = event;

	const eventToAdd = {
		title,
		description: notes,
		icon: emoji,
		timeStart: startTime,
		timeEnd: finishTime,
		isPinned: false,
	};

	return dbActions.dbStartRequest({
		type: 'POST',
		body: eventToAdd,
		onSuccess: eventsLoaded.type,
	});
};

// export const updateEvent = (
// 	uid: string,
// 	year: number,
// 	month: number,
// 	day: number,
// 	eventKey: string,
// 	updatedEvent: Event,
// ) => {
// 	const ref = createEventsRef({ uid, year, month, day, eventKey });

// 	return firebaseActions.updateItemCallBegun({
// 		ref,
// 		updatedEvent,
// 	});
// };

// export const removeEvent = (
// 	uid: string,
// 	year: number,
// 	month: number,
// 	day: number,
// 	eventKey: string,
// ) => {
// 	const ref = createEventsRef({ uid, year, month, day, eventKey });

// 	return firebaseActions.removeItemCallBegun({
// 		ref,
// 	});
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

export const getVisibleYearEvents = createSelector(
	(state: RootState) => state.calendar.events,
	(state: RootState) => String(state.calendar.visibleDate.getFullYear()),
	(userEvents: UserEvents, year: string): YearEvents | null =>
		userEvents ? userEvents[year] : null,
);

export const getVisibleMonthEvents = createSelector(
	(state: RootState) => getVisibleYearEvents(state),
	(state: RootState) => String(state.calendar.visibleDate.getMonth()),
	(yearEvents: YearEvents | null, month: string): MonthEvents | null =>
		yearEvents ? yearEvents[month] : null,
);

export const getVisibleDayEvents = createSelector(
	(state: RootState) => getVisibleMonthEvents(state),
	(state: RootState) => String(state.calendar.visibleDate.getDate()),
	(monthEvents: MonthEvents | null, date: string): DayEvents | null =>
		monthEvents ? monthEvents[date] : null,
);

// Helper functions
const getDaysInMonthCount = (year: number, month: number) =>
	new Date(year, month, 0).getDate();
