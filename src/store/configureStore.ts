import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';

import logger from './middleware/logger';
import func from './middleware/func';

export default function () {
	return configureStore({ reducer, middleware: [logger('console'), func] });
}
