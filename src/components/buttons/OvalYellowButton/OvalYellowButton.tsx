import React from 'react';
import { Link } from 'react-router-dom';

import './OvalYellowButton.css';

type Props = {
	text: string;
	disabled: boolean;
	to?: string;
	type?: 'button' | 'submit';
	onClick?: () => void;
};

export function OvalYellowButton({
	text,
	disabled,
	to,
	type = 'button',
	onClick,
}: Props) {
	return to ? (
		<Link to={to}>
			<button type={type} className='oval-yellow-btn' disabled={disabled}>
				{text}
			</button>
		</Link>
	) : (
		<button
			type={type}
			className='oval-yellow-btn'
			disabled={disabled}
			onClick={onClick}>
			{text}
		</button>
	);
}
