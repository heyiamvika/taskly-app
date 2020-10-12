import React from 'react';
import { Link } from 'react-router-dom';

import './OvalYellowButton.css';

type Props = {
	text: string;
	to?: string;
	type?: 'button' | 'submit';
};

export function OvalYellowButton({ text, to, type = 'button' }: Props) {
	return to ? (
		<Link to={to}>
			<button type={type} className='oval-yellow-btn'>
				{text}
			</button>
		</Link>
	) : (
		<button type={type} className='oval-yellow-btn'>
			{text}
		</button>
	);
}
