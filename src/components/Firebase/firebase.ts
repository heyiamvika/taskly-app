import app from 'firebase/app';
import 'firebase/auth';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase {
	// TO_DO: search for a correct solution for that (what type should auth be?)
	auth: any;

	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
	}

	createUserWithEmailAndPassword(email: string, password: string) {
		return this.auth.createUserWithEmailAndPassword(email, password);
	}

	signInWithEmailAndPassword(email: string, password: string) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	signOut() {
		return this.auth.signOut();
	}

	resetPassword(email: string) {
		return this.auth.sendPasswordResetEmail(email);
	}

	updatePassword(password: string) {
		return this.auth.currentUser.updatePassword(password);
	}
}

export default Firebase;
