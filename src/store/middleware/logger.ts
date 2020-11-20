import { Middleware } from 'redux';

const logger: (param: string) => Middleware = (param) => (store) => (next) => (
	action,
) => {
	console.log('logger');
	next(action);
};

export default logger;
