import { createStore } from 'redux';
import reducer from './calendarEvents';
import { devToolsEnhancer } from 'redux-devtools-extension';

export default function configireStore() {
	return createStore(reducer, devToolsEnhancer({}));
}
