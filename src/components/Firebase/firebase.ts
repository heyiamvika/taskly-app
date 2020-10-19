import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { Event } from '../../utils/types';

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
	db: any;

	constructor() {
		app.initializeApp(config);
		this.auth = app.auth();
		this.db = app.database();
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

	user(uid: string) {
		return this.db.ref(`users/${uid}`);
	}

	users() {
		return this.db.ref(`users/`);
	}

	async getMonthlySchedule(uid: string, year: number, month: number) {
		const schedulesRef = this.db.ref(`calendars/${uid}/${year}/${month}`);
		const schedule = await schedulesRef
			.once('value')
			.then((snapshot: any) => snapshot.val());

		return schedule;
	}

	subscribeToMonthlySchedule(
		uid: string,
		year: number,
		month: number,
		callback: (data: any) => void,
	) {
		const schedulesRef = this.db.ref(`calendars/${uid}/${year}/${month}`);

		schedulesRef.on('child_added', function (data: any) {
			callback(data.val());
		});
	}

	createNewTask(
		uid: string,
		year: number,
		month: number,
		day: number,
		event: Event,
	) {
		this.db.ref(`calendars/${uid}/${year}/${month}/${day}`).push(event);
	}

	pinTask() {}

	deleteTask() {}
}

export default Firebase;
