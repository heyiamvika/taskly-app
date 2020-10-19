import React, { useState } from 'react';

import './AddNewEvent.css';

import { RoundYellowButton } from '../buttons/RoundYellowButton/RoundYellowButton';

import Firebase from '../Firebase/index';
import { EmojiPicker } from '../buttons/EmojiPicker/EmojiPicker';
import { BasicInput } from '../inputs/BasicInput/BasicInput';
import { TimePicker } from '../inputs/TimePicker/TimePicker';
import { NoteInput } from '../inputs/NoteInput/NoteInput';

type Event = {
	emoji: string | undefined;
	startTime: string;
	finishTime: string;
	title: string;
	notes: string;
	isPinned: boolean;
};

type Props = {
	firebase: Firebase;
	isVisible: boolean;
	eventDate: Date;
	onCloseBtnClick: () => void;
};

export function AddNewEvent({
	firebase,
	eventDate,
	isVisible,
	onCloseBtnClick,
}: Props) {
	const [newEvent, setNewEvent] = useState<Event>({
		emoji: '🥰',
		startTime: '',
		finishTime: '',
		title: '',
		notes: '',
		isPinned: false,
	});
	// useEffect(() => {
	// 	//componentDidMount
	// 	//componentDidUpdate
	// 	// Create new task!!
	// 	// const startTime = new Date(
	// 	// 	visibleDate.getFullYear(),
	// 	// 	visibleDate.getMonth(),
	// 	// 	visibleDate.getDate(),
	// 	// 	7,
	// 	// );
	// 	// const finishTime = new Date(
	// 	// 	visibleDate.getFullYear(),
	// 	// 	visibleDate.getMonth(),
	// 	// 	visibleDate.getDate(),
	// 	// 	8,
	// 	// );
	// 	// firebase.createNewTask(
	// 	// 	user.uid,
	// 	// 	visibleDate.getFullYear(),
	// 	// 	visibleDate.getMonth(),
	// 	// 	visibleDate.getDate(),
	// 	// 	{
	// 	// 		startTime: startTime.toString(),
	// 	// 		finishTime: finishTime.toString(),
	// 	// 		name: 'Wake up Buddy',
	// 	// 		notes: 'Zoom call, kick off with Elena and Jordan from Shift.',
	// 	// 		isPinned: false,
	// 	// 	},
	// 	// );
	// 	// return () => {
	// 	// 	// runs when componentDidUnmount
	// 	// 	console.log('cleanup');
	// 	// };
	// });

	const changeEventValue = <Type extends {}>(newValue: Type, key: string) => {
		setNewEvent({ ...newEvent, [key]: newValue });
	};

	const { emoji, startTime, finishTime, title, notes, isPinned } = newEvent;
	console.log('event changed', newEvent);

	return (
		<div
			className={`add-new-event-section ${isVisible ? 'visible' : 'hidden'}`}>
			<div className='input-wrapper'>
				<EmojiPicker emoji={emoji} onEmojiChange={changeEventValue} />
			</div>
			<div className='input-wrapper'>
				<BasicInput
					name='title'
					value={title}
					placeholder='Type your event name here...'
					inputType='text'
					color='transparent'
					onChange={changeEventValue}
				/>
			</div>
			<div className='input-wrapper'>
				<TimePicker
					title='Event start'
					emoji='⏰'
					eventDate={eventDate}
					keyOnSelectChange='startTime'
					onSelectChange={changeEventValue}
				/>
			</div>
			<div className='input-wrapper'>
				<TimePicker
					title='Event end'
					emoji='⌛'
					eventDate={eventDate}
					keyOnSelectChange='finishTime'
					onSelectChange={changeEventValue}
				/>
			</div>
			<div className='input-wrapper'>
				<NoteInput
					emoji='✏️'
					title='Add a note'
					keyOnSelectChange='notes'
					onChange={changeEventValue}
				/>
			</div>
			<div className='close-btn-wrapper'>
				<RoundYellowButton label='x' onClick={onCloseBtnClick} />
			</div>
		</div>
	);
}
