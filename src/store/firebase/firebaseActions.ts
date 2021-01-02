import { createAction } from '@reduxjs/toolkit';

import { Event } from '../store-types/calendar';

// Auth
export const subscribeAuthCallBegan = createAction<{
	onAuthorized: string;
	onLoggedOut: string;
	onStart: string;
	onError?: string;
}>('firebase/subscribeAuthCallBegan');
export const userSignupCallBegun = createAction<{
	email: string;
	password: string;
	onError?: string;
}>('firebase/userSignupCallBegun');
export const userLoginCallBegun = createAction<{
	email: string;
	password: string;
	onError?: string;
}>('firebase/userLoginCallBegun');
export const userLogoutCallBegun = createAction('firebase/userLogoutCallBegun');

// Database
export const subscribeDatabaseCallBegan = createAction<{
	ref: string;
	onSuccess: string;
	onStart: string;
	onError?: string;
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
export const firebaseCallSuccess = createAction<{}>(
	'firebase/firebaseCallSuccess',
);
export const firebaseCallFailed = createAction<string>(
	'firebase/firebaseCallFailed',
);
