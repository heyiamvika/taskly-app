import React from 'react';
import AuthUserContext from './context';

const withAuthentification = (Component: any) => (props: any) => (
	<AuthUserContext.Consumer>
		{(user) => <Component {...props} user={user} />}
	</AuthUserContext.Consumer>
);

export default withAuthentification;
