// JS entrypoint
import React, { Dispatch } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './components/Firebase/index';

// Temporary code to test store
import configireStore from './store/configureStore';
import {
	newEventAdded,
	eventDetailsChanged,
	eventDeleted,
	getEventsForDate,
	getEventsBooleansForMonth,
} from './store/calendarEvents';
import { signup, login, logout } from './store/auth';
import { StateFromReducersMapObject } from 'redux';

const store = configireStore();

const unsubscribe = store.subscribe(() => {
	console.log('Store changed', store.getState());
});

store.dispatch(() => {
	store.dispatch({
		type: 'bugsReceived',
		bugs: [1, 2, 3],
	});
});

store.dispatch(
	signup({
		fullName: 'Vika',
		email: 'viktoriian@wix.com',
		password: '12344',
		userId: '1',
		profileImage: '',
	}),
);

store.dispatch(logout());

store.dispatch(
	login({
		fullName: 'Anya',
		email: 'viktoriian@wix.com',
		password: '12344',
		userId: '1',
		profileImage: '',
	}),
);

const date = new Date();

store.dispatch(
	newEventAdded({
		eventDate: '25/10/2020',
		newEvent: {
			title: 'My new test event',
			notes: '',
			timeEnd: date,
			timeStart: date,
			emoji: '',
			attendees: [],
		},
	}),
);

store.dispatch(
	eventDetailsChanged({
		eventDate: '25/10/2020',
		id: 1,
		changedEvent: {
			title: 'My changed test event',
			notes: 'Hemlo',
			timeEnd: date,
			timeStart: date,
			emoji: '',
			attendees: [],
		},
	}),
);

ReactDOM.render(
	<React.StrictMode>
		<FirebaseContext.Provider value={new Firebase()}>
			<App />
		</FirebaseContext.Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
