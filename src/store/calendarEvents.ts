import {
	Store,
	EventAction,
	Calendar,
	CalendarEvent,
	AddEventAction,
	ChangeEventDetailsAction,
	DeleteEventAction,
} from './storeTypes';

// Action types
const EVENT_DELETED = 'EVENT_DELETED';
const NEW_EVENT_ADDED = 'NEW_EVENT_ADDED';
const EVENT_DETAILS_CHANGED = 'EVENT_DETAILS_CHANGED';

// Action creators
export const newEventAdded = (
	eventDate: string,
	newEvent: CalendarEvent,
): AddEventAction => ({
	type: NEW_EVENT_ADDED,
	payload: {
		eventDate,
		newEvent,
	},
});

export const eventDeleted = (
	eventDate: string,
	id: number,
): DeleteEventAction => ({
	type: EVENT_DELETED,
	payload: {
		eventDate,
		id,
	},
});

export const eventDetailsChanged = (
	eventDate: string,
	id: number,
	changedEvent: CalendarEvent,
): ChangeEventDetailsAction => ({
	type: EVENT_DETAILS_CHANGED,
	payload: {
		eventDate,
		id,
		changedEvent,
	},
});

// temporary
let nextId = 0;

const initialStore: Store = {
	currentUser: null,
	calendar: {},
};

export default function reducer(
	state: Store = initialStore,
	action: EventAction,
): Store {
	switch (action.type) {
		// Events
		case NEW_EVENT_ADDED: {
			const { eventDate, newEvent } = action.payload;
			return {
				...state,
				calendar: addEvent(state.calendar, eventDate, newEvent),
			};
		}
		case EVENT_DELETED: {
			const { eventDate, id } = action.payload;
			return {
				...state,
				calendar: deleteEvent(state.calendar, eventDate, id),
			};
		}
		case EVENT_DETAILS_CHANGED: {
			const { eventDate, id, changedEvent } = action.payload;

			return {
				...state,
				calendar: changeEvent(state.calendar, eventDate, id, changedEvent),
			};
		}
		default:
			return state;
	}
}

// Helper functions
function addEvent(
	calendar: Calendar,
	eventDate: string,
	newEvent: CalendarEvent,
): Calendar {
	const eventToAdd = { ...newEvent, id: ++nextId };

	return {
		...calendar,
		[eventDate]: hasDateInCalendar(calendar, eventDate)
			? [...calendar[eventDate], eventToAdd]
			: [eventToAdd],
	};
}

function changeEvent(
	calendar: Calendar,
	eventDate: string,
	eventId: number,
	changedEvent: CalendarEvent,
): Calendar {
	const changedEvents = calendar[eventDate].map((event) =>
		event.id === eventId ? { ...event, ...changedEvent } : event,
	);
	return { ...calendar, [eventDate]: changedEvents };
}

function deleteEvent(
	calendar: Calendar,
	eventDate: string,
	eventId: number,
): Calendar {
	const newCalendarDayEvents = calendar[eventDate].filter(
		(event) => event.id !== eventId,
	);

	return isDayEmpty(newCalendarDayEvents)
		? deleteDate(calendar, eventDate)
		: { ...calendar, [eventDate]: newCalendarDayEvents };
}

function deleteDate(calendar: Calendar, date: string): Calendar {
	const calendarCopy = { ...calendar };
	delete calendarCopy[date];
	return calendarCopy;
}

function isDayEmpty(dayEvents: CalendarEvent[]): boolean {
	return dayEvents.length === 0;
}

function hasDateInCalendar(calendar: Calendar, date: string): boolean {
	return calendar.hasOwnProperty(date);
}
