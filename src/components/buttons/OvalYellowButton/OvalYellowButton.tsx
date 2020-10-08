import React from 'react';
import { Link } from 'react-router-dom';

import './OvalYellowButton.css';

type Props = {
	text: string;
	to: string;
};

export function OvalYellowButton({ text, to }: Props) {
	return (
		<Link to={to}>
			<button className='oval-yellow-btn'>{text}</button>
		</Link>
	);
}
