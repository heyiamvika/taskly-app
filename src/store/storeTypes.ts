type StoreUser = {
	fullName: string;
	email: string;
	password: string;
	profileImage: string;
	userId: string;
};

type StoreCalendarEvent = {
	title: string;
	notes: string;
	timeStart: Date;
	timeEnd: Date;
	emoji: string;
	attendees: string[];
};

export type Store = {
	currentUser: StoreUser | null;
	calendarEvents: {
		[date: string]: {
			[id: string]: StoreCalendarEvent;
		};
	};
};

type AddEventAction = {
	type: 'NEW_EVENT_ADDED';
	payload: {
		eventDate: string;
		newEvent: StoreCalendarEvent;
	};
};

type DeleteEventAction = {
	type: 'EVENT_DELETED';
	payload: {
		eventDate: string;
		id: string;
	};
};

type ChangeEventDetails = {
	type: 'EVENT_DETAILS_CHANGED';
	payload: {
		eventDate: string;
		id: string;
		newEvent: StoreCalendarEvent;
	};
};

export type EventAction =
	| AddEventAction
	| DeleteEventAction
	| ChangeEventDetails;
