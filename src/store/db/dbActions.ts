import { createAction } from '@reduxjs/toolkit';

type RequestType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const dbStartRequest = createAction<{
	type: RequestType;
	body: {};
	onSuccess: string;
}>('db/dbStartRequest');
