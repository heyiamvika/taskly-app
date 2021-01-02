import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

import * as firebaseActions from './firebase/firebaseActions';

import { AuthState } from './store-types/auth';
import { RootState } from './store-types/root';

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		authStarted: (state) => {
			state.loading = true;
			state.error = null;
		},
		authFailed: (state) => {
			state.loading = false;
		},
		userAuthorized: (state, action) => {
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		userLoggedOut: (state) => {
			state.user = null;
			state.loading = false;
			state.error = null;
		},
	},
});

export const {
	userAuthorized,
	userLoggedOut,
	authStarted,
	authFailed,
} = authSlice.actions;
export default authSlice.reducer;

// Action creators
export const subscribeToUserAuthStateChanges = () =>
	firebaseActions.subscribeAuthCallBegan({
		onAuthorized: userAuthorized.type,
		onLoggedOut: userLoggedOut.type,
		onStart: authStarted.type,
		onError: authFailed.type,
	});

export const signup = (email: string, password: string) =>
	firebaseActions.userSignupCallBegun({
		email,
		password,
		onError: authFailed.type,
	});

export const login = (email: string, password: string) =>
	firebaseActions.userLoginCallBegun({
		email,
		password,
		onError: authFailed.type,
	});

export const logout = () => firebaseActions.userLogoutCallBegun();

// Selectors
export const isUserLoggedIn = createSelector(
	(state: RootState) => state.auth.user,
	(user) => Boolean(user),
);

export const getUserId = createSelector(
	(state: RootState) => state.auth.user,
	(user) => (user ? user.id : null),
);
