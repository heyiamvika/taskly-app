// State
export type Event = {
	emoji: string;
	startTime: string;
	finishTime: string;
	title: string;
	notes: string;
	isPinned: boolean;
};

export type DayEvents = {
	[key: string]: Event;
};

export type MonthEvents = {
	[day: string]: DayEvents;
};

export type YearEvents = {
	[month: string]: MonthEvents;
};

export type UserEvents = {
	[year: string]: YearEvents;
};

export type CalendarState = {
	currentDate: Date;
	visibleDate: Date;
	events: UserEvents;
	loading: boolean;
	isSubscribed: boolean;
};
