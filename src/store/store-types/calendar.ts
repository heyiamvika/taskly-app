// State
export type Event = {};

export type DayEvents = {
	[key: string]: Event;
};

export type MonthEvents = {
	[month: string]: {
		[day: string]: DayEvents;
	};
};

export type UserEvents = {
	[year: string]: MonthEvents;
};

export type CalendarState = {
	events: UserEvents;
	loading: boolean;
	isSubscribed: boolean;
};
