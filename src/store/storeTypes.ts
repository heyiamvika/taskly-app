type User = {
	fullName: string;
	email: string;
	password: string;
	profileImage: string;
	userId: string;
};

export type CalendarEvent = {
	title: string;
	notes: string;
	timeStart: Date;
	timeEnd: Date;
	emoji: string;
	attendees: string[];
};

type CalendarEventWithId = CalendarEvent & {
	id: number;
};

export type Calendar = {
	[date: string]: CalendarEventWithId[];
};

export type Store = {
	currentUser: User | null;
	calendar: Calendar;
};

export type AddEventAction = {
	type: 'NEW_EVENT_ADDED';
	payload: {
		eventDate: string;
		newEvent: CalendarEvent;
	};
};

export type DeleteEventAction = {
	type: 'EVENT_DELETED';
	payload: {
		eventDate: string;
		id: number;
	};
};

export type ChangeEventDetailsAction = {
	type: 'EVENT_DETAILS_CHANGED';
	payload: {
		eventDate: string;
		id: number;
		changedEvent: CalendarEvent;
	};
};

export type EventAction =
	| AddEventAction
	| DeleteEventAction
	| ChangeEventDetailsAction;
