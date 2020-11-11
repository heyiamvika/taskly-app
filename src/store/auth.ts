import { User, LoggedInUser } from './storeTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: { user: User } = { user: null };

const userSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signup: (state, action: PayloadAction<LoggedInUser>) => {
			state.user = action.payload;
		},
		login: (state, action: PayloadAction<LoggedInUser>) => {
			state.user = action.payload;
		},
		logout: (state) => {
			state.user = null;
		},
	},
});

export const { signup, login, logout } = userSlice.actions;
export default userSlice.reducer;
