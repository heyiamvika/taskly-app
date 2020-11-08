// JS entrypoint
import React from 'react';
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
} from './store/calendarEvents';

const store = configireStore();

const unsubscribe = store.subscribe(() => {
	console.log('Store changed', store.getState());
});

const date = new Date();

store.dispatch(
	newEventAdded('25/10/2020', {
		title: 'My new test event',
		notes: '',
		timeEnd: date,
		timeStart: date,
		emoji: '',
		attendees: [],
	}),
);

store.dispatch(
	eventDetailsChanged('25/10/2020', 1, {
		title: 'My changed test event',
		notes: 'Hemlo',
		timeEnd: date,
		timeStart: date,
		emoji: '',
		attendees: [],
	}),
);

store.dispatch(eventDeleted('25/10/2020', 1));

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
