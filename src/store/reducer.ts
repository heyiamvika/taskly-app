import { Store, EventAction } from './storeTypes';

// temporary
let nextId = 0;

export default function reducer(state: Store, action: EventAction): Store {
	switch (action.type) {
		// Events
		case 'NEW_EVENT_ADDED': {
			const { eventDate, newEvent } = action.payload;

			const calendarEvents = {
				...state.calendarEvents,
				[eventDate]: {
					...state.calendarEvents[eventDate],
					[++nextId]: newEvent,
				},
			};

			return { ...state, calendarEvents };
		}
		case 'EVENT_DELETED': {
			const { eventDate, id } = action.payload;

			const {
				[id]: eventToDelete,
				...newCalendarDayEvents
			} = state.calendarEvents[eventDate];

			const calendarEvents = {
				...state.calendarEvents,
				[eventDate]: newCalendarDayEvents,
			};

			return { ...state, calendarEvents };
		}
		case 'EVENT_DETAILS_CHANGED': {
			const { eventDate, id, newEvent } = action.payload;

			const eventChanged = { ...state.calendarEvents[eventDate][id], newEvent };
			const calendarDayEventsChanged = {
				...state.calendarEvents[eventDate],
				[id]: eventChanged,
			};

			const calendarEvents = {
				...state.calendarEvents,
				[eventDate]: calendarDayEventsChanged,
			};

			return { ...state, calendarEvents };
		}
		default:
			return state;
	}
}
