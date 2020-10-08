import React from 'react';
import { Link } from 'react-router-dom';
import './PlainTextYellowButton.css';

type Props = {
	text: string;
	to: string;
};

export function PlainTextYellowButton({ text, to }: Props) {
	return (
		<Link to={to}>
			<button className='plain-text-yellow-btn'>{text}</button>
		</Link>
	);
}
