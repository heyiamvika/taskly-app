import { combineReducers } from 'redux';

import calendarEventsReducer from './calendarEvents';

export default combineReducers({
	calendarEvents: calendarEventsReducer,
});
