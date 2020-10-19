import React, { useState } from 'react';

import { EmojiButton } from '@joeattardi/emoji-button';

import './EmojiPicker.css';

type Props = {};

export function EmojiPicker() {
	const [currentEmoji, setCurrentEmoji] = useState<string | undefined>('🥰');

	const picker = new EmojiButton();
	const trigger = document.querySelector('#emoji-trigger');

	picker.on('emoji', (selection) => {
		// handle the selected emoji here
		setCurrentEmoji(selection.emoji);
	});

	trigger?.addEventListener('click', () =>
		picker.togglePicker(trigger as HTMLElement),
	);

	return (
		<div>
			<button id='emoji-trigger' className='emoji-button'>
				<span className='initial-emoji' role='img' aria-label='emoji'>
					{currentEmoji}
				</span>
			</button>
		</div>
	);
}
