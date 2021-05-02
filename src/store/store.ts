import {
	combineReducers,
	configureStore,
	getDefaultMiddleware,
} from '@reduxjs/toolkit';

import authReducer from './auth';
import calendarReducer from './calendar';

import firebaseAuthMiddleware from './middleware/firebaseAuthMiddleware';
import firebaseDatabaseMiddleware from './middleware/firebaseDatabaseMiddleware';
import customDatabaseMiddleware from './middleware/customBackendMiddleware';

const rootReducer = combineReducers({
	auth: authReducer,
	calendar: calendarReducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: [
		...getDefaultMiddleware(),
		customDatabaseMiddleware,
		firebaseAuthMiddleware,
		firebaseDatabaseMiddleware,
	],
});

export type StoreDispatch = typeof store.dispatch;
export type StoreGetState = typeof store.getState;
export type RootState = ReturnType<typeof rootReducer>;
export default store;
