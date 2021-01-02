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
					console.log('user signup call begin');

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
			console.log('error occured');

			const { onError } = action.payload;

			// Default
			dispatch(firebaseActions.firebaseCallFailed(error.message));

			// For custom error actions
			if (onError) {
				dispatch({
					type: onError,
					payload: error.message,
				});
			}
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
		console.log('user changed', user);
		// For loading indicators
		if (onStart) dispatch({ type: onStart });

		if (user) {
			// Default
			const { displayName: fullName, email, photoURL: profileImage } = user;

			dispatch(
				firebaseActions.firebaseCallSuccess({ fullName, email, profileImage }),
			);

			if (onAuthorized) {
				dispatch({
					type: onAuthorized,
					payload: {
						fullName,
						email,
						profileImage,
					},
				});
			}
		} else {
			dispatch(firebaseActions.firebaseCallSuccess({}));

			if (onLoggedOut) {
				dispatch({
					type: onLoggedOut,
				});
			}
		}
	});

const signupUser = (email: string, password: string) =>
	auth.createUserWithEmailAndPassword(email, password);

const loginUser = (email: string, password: string) =>
	auth.signInWithEmailAndPassword(email, password);

const logoutUser = () => auth.signOut();
