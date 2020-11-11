export type LoggedInUser = {
	fullName: string;
	email: string;
	password: string;
	profileImage: string;
	userId: string;
};

export type User = LoggedInUser | null;

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
