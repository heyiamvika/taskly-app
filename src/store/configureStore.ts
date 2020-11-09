import reducer from './calendarEvents';
import { configureStore } from '@reduxjs/toolkit';

export default function () {
	return configureStore({ reducer });
}
