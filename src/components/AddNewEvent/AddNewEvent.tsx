import React, { useState } from 'react';

import './AddNewEvent.css';

import { RoundYellowButton } from '../buttons/RoundYellowButton/RoundYellowButton';

import { EmojiPicker } from '../buttons/EmojiPicker/EmojiPicker';
import { BasicInput } from '../inputs/BasicInput/BasicInput';
import { TimePicker } from '../inputs/TimePicker/TimePicker';
import { NoteInput } from '../inputs/NoteInput/NoteInput';
import { OvalYellowButton } from '../buttons/OvalYellowButton/OvalYellowButton';

import { Event } from '../../store/store-types/calendar';

import { useSelector, useDispatch } from 'react-redux';
import { addNewEvent, getVisibleDate } from '../../store/calendar';

type Props = {
	isVisible: boolean;
	onCloseBtnClick: () => void;
};

export function AddNewEvent({ isVisible, onCloseBtnClick }: Props) {
	const emptyEvent = {
		emoji: '🥰',
		startTime: '',
		finishTime: '',
		title: '',
		notes: '',
		isPinned: false,
	};

	const [newEvent, setNewEvent] = useState<Event>(emptyEvent);

	const dispatch = useDispatch();
	const eventDate = useSelector(getVisibleDate);

	const changeEventValue = (
		newValue: string | boolean | undefined,
		key: string,
	) => {
		setNewEvent({ ...newEvent, [key]: newValue });
	};

	const onCreateNewEvent = () => dispatch(addNewEvent(newEvent));

	const { emoji, title } = newEvent;

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
			<OvalYellowButton
				text='Create event'
				disabled={false}
				onClick={onCreateNewEvent}
			/>
			<div className='close-btn-wrapper'>
				<RoundYellowButton label='x' onClick={onCloseBtnClick} />
			</div>
		</div>
	);
}
