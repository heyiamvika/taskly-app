import React from 'react';

import './RoundYellowButton.css';

type Props = {
	label: 'x' | '+';
	onClick: () => void;
};

export function RoundYellowButton({ label, onClick }: Props) {
	return (
		<button className='add-new-event-btn' onClick={onClick}>
			{label}
		</button>
	);
}
