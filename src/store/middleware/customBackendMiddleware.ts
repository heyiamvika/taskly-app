import { act } from 'react-dom/test-utils';
import { Middleware } from 'redux';

import { RootState } from '../store-types/root';
import * as dbActions from '../db/dbActions';

const dbActionTypes = [dbActions.dbStartRequest.type];

const customDatabaseMiddleware: Middleware<{}, RootState> = ({ dispatch }) => (
	next,
) => async (action) => {
	if (dbActionTypes.includes(action.type)) {
		const { type, body } = action.payload;
		console.log('customDatabaseMiddleware', action);

		// Make a call here

		// Call a on success event
	}

	return next(action);
};

export default customDatabaseMiddleware;
