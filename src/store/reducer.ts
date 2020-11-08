import { Store, EventAction, Calendar, CalendarEvent } from './storeTypes';

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
		case 'NEW_EVENT_ADDED': {
			const { eventDate, newEvent } = action.payload;
			return {
				...state,
				calendar: addEvent(state.calendar, eventDate, newEvent),
			};
		}
		case 'EVENT_DELETED': {
			const { eventDate, id } = action.payload;
			return {
				...state,
				calendar: deleteEvent(state.calendar, eventDate, id),
			};
		}
		case 'EVENT_DETAILS_CHANGED': {
			const { eventDate, id, newEvent } = action.payload;

			return {
				...state,
				calendar: changeEvent(state.calendar, eventDate, id, newEvent),
			};
		}
		default:
			return state;
	}
}

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
	newEvent: CalendarEvent,
): Calendar {
	const changedEvents = calendar[eventDate].map((event) =>
		event.id === eventId ? { ...event, ...newEvent } : event,
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
