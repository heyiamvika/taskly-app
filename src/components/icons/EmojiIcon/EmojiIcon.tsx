import React from 'react';

import './EmojiIcon.css';

type Props = {
	emoji: string | undefined;
};

export function EmojiIcon({ emoji }: Props) {
	return (
		<div className='emoji-icon'>
			<span>{emoji}</span>
		</div>
	);
}
