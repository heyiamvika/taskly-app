import { Middleware } from 'redux';

import * as firebaseActions from '../firebase/firebaseActions';
import { auth } from '../firebase/firebaseConfig';

import { RootState } from '../store-types/root';
import { StoreDispatch } from '../store';

const firebaseActionTypes = [
	firebaseActions.subscribeAuthCallBegan.type,
	firebaseActions.userSignupCallBegun.type,
	firebaseActions.userLoginCallBegun.type,
	firebaseActions.userLogoutCallBegun.type,
];

const firebaseAuthMiddleware: Middleware<{}, RootState> = ({ dispatch }) => (
	next,
) => async (action) => {
	if (firebaseActionTypes.includes(action.type)) {
		try {
			switch (action.type) {
				case firebaseActions.subscribeAuthCallBegan.type: {
					const { onAuthorized, onLoggedOut, onStart } = action.payload;
					await subscribeToUserAuth(
						dispatch,
						onAuthorized,
						onLoggedOut,
						onStart,
					);
					break;
				}
				case firebaseActions.userSignupCallBegun.type: {
					const { email, password } = action.payload;
					await signupUser(email, password);
					break;
				}
				case firebaseActions.userLoginCallBegun.type: {
					const { email, password } = action.payload;
					await loginUser(email, password);
					break;
				}
				case firebaseActions.userLogoutCallBegun.type: {
					await logoutUser();
					break;
				}
				default:
					break;
			}
		} catch (error) {
			const { onError } = action.payload;

			// Default
			dispatch(firebaseActions.firebaseCallFailed(error.message));

			// For custom error actions
			dispatch({
				type: onError,
				payload: error.message,
			});
		}
	}

	return next(action);
};

export default firebaseAuthMiddleware;

const subscribeToUserAuth = (
	dispatch: StoreDispatch,
	onAuthorized: string,
	onLoggedOut: string,
	onStart: string,
) =>
	auth.onAuthStateChanged((user) => {
		// For loading indicators
		dispatch({ type: onStart });

		// Default
		dispatch(firebaseActions.firebaseCallSuccess());

		if (user) {
			// User logged in
			const { displayName: fullName, email, photoURL: profileImage } = user;

			dispatch({
				type: onAuthorized,
				payload: {
					fullName,
					email,
					profileImage,
				},
			});
		} else {
			// User logged out
			dispatch({ type: onLoggedOut });
		}
	});

const signupUser = (email: string, password: string) =>
	auth.createUserWithEmailAndPassword(email, password);

const loginUser = (email: string, password: string) =>
	auth.signInWithEmailAndPassword(email, password);

const logoutUser = () => auth.signOut();
