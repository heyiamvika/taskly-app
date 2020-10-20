import React, { useEffect } from 'react';

import * as ROUTES from '../../utils/routes';

const withAuthorization = (Component: any) => (props: any) => {
	useEffect(() => {
		props.firebase.auth.onAuthStateChanged((authUser: any) => {
			if (!authUser) {
				props.history.push(ROUTES.WELCOME_SCREEN);
			}
		});
	}, [props.firebase.auth, props.history]);

	return <Component {...props} />;
};

export default withAuthorization;
