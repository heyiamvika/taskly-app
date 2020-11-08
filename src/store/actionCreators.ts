import * as actions from './actionTypes';

import {
	CalendarEvent,
	AddEventAction,
	ChangeEventDetailsAction,
	DeleteEventAction,
} from './storeTypes';

export function newEventAdded(
	eventDate: string,
	newEvent: CalendarEvent,
): AddEventAction {
	return {
		type: actions.NEW_EVENT_ADDED,
		payload: {
			eventDate,
			newEvent,
		},
	};
}

export function eventDeleted(eventDate: string, id: number): DeleteEventAction {
	return {
		type: actions.EVENT_DELETED,
		payload: {
			eventDate,
			id,
		},
	};
}

export function eventDetailsChanged(
	eventDate: string,
	id: number,
	changedEvent: CalendarEvent,
): ChangeEventDetailsAction {
	return {
		type: actions.EVENT_DETAILS_CHANGED,
		payload: {
			eventDate,
			id,
			changedEvent,
		},
	};
}
