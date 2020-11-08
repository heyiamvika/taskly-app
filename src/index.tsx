// JS entrypoint
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './components/Firebase/index';

import store from './store/store';

// Temporary code to test store
const date = new Date();

store.dispatch({
	type: 'NEW_EVENT_ADDED',
	payload: {
		eventDate: '25/10/2020',
		newEvent: {
			title: 'My new test event',
			notes: '',
			timeEnd: date,
			timeStart: date,
			emoji: '',
			attendees: [],
		},
	},
});

console.log(store.getState());

store.dispatch({
	type: 'EVENT_DETAILS_CHANGED',
	payload: {
		eventDate: '25/10/2020',
		id: 1,
		newEvent: {
			title: 'My changed test event',
			notes: 'Hemlo',
			timeEnd: date,
			timeStart: date,
			emoji: '',
			attendees: [],
		},
	},
});

console.log(store.getState());

store.dispatch({
	type: 'EVENT_DELETED',
	payload: {
		eventDate: '25/10/2020',
		id: 1,
	},
});

console.log(store.getState());

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
