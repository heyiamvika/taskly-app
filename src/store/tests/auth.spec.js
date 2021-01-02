import { subscribeToUserAuthStateChanges, signup, authFailed } from '../auth';
import { userSignupCallBegun } from '../firebase/firebaseActions';

import store from '../store';

// I'm writing social tests for the store instead of solitary ones,
// since I don't want tests to be too coupled to implementation
store.dispatch(subscribeToUserAuthStateChanges());

describe('authSlice', () => {
	it('should handle the signup action for new user', async () => {
		const testEmail = 'hello@gmail.com';
		const testPassword = 'password';

		const expected = {
			fullName: null,
			email: testEmail,
			profileImage: null,
		};

		await store.dispatch(signup(testEmail, testPassword));

		// expect(store.getState().auth.user).toEqual(expected);
	});
});
