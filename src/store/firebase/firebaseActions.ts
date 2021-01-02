import { createAction } from '@reduxjs/toolkit';

import { Event } from '../store-types/calendar';

type subscribeAuthCallPayload = {
	onAuthorized: string;
	onLoggedOut: string;
	onStart: string;
	onError: string;
};

type authCallPayload = {
	email: string;
	password: string;
	onError: string;
};

// Auth
export const subscribeAuthCallBegan = createAction<subscribeAuthCallPayload>(
	'firebase/subscribeAuthCallBegan',
);
export const userSignupCallBegun = createAction<authCallPayload>(
	'firebase/userSignupCallBegun',
);
export const userLoginCallBegun = createAction<authCallPayload>(
	'firebase/userLoginCallBegun',
);
export const userLogoutCallBegun = createAction('firebase/userLogoutCallBegun');

// Database
export const subscribeDatabaseCallBegan = createAction<{
	ref: string;
	onSuccess: string;
	onStart: string;
	onError: string;
}>('firebase/subscribeDatabaseCallBegan');
export const addItemCallBegun = createAction<{
	ref: string;
	item: Event;
}>('firebase/addItemCallBegun');
export const updateItemCallBegun = createAction<{
	ref: string;
	updatedEvent: Event;
}>('firebase/updateItemCallBegun');
export const removeItemCallBegun = createAction<{ ref: string }>(
	'firebase/removeItemCallBegun',
);

// Default
export const firebaseCallSuccess = createAction('firebase/firebaseCallSuccess');
export const firebaseCallFailed = createAction<string>(
	'firebase/firebaseCallFailed',
);
