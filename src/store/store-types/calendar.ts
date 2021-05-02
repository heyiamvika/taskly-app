// State
export type Event = {
	emoji: string;
	startTime: string;
	finishTime: string;
	title: string;
	notes: string;
	isPinned: boolean;
};

export type UserEvents = Event[];

export type CalendarState = {
	currentDate: Date;
	visibleDate: Date;
	events: UserEvents;
};
