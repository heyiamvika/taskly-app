import React from 'react';

import './AddNewEvent.css';

import { RoundYellowButton } from '../buttons/RoundYellowButton/RoundYellowButton';

import Firebase from '../Firebase/index';
import { EmojiPicker } from '../buttons/EmojiPicker/EmojiPicker';

type Props = {
	firebase: Firebase;
	isVisible: boolean;
	onCloseBtnClick: () => void;
};

export function AddNewEvent({ firebase, isVisible, onCloseBtnClick }: Props) {
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

	return (
		<div
			className={`add-new-event-section ${isVisible ? 'visible' : 'hidden'}`}>
			<EmojiPicker />
			<div className='close-btn-wrapper'>
				<RoundYellowButton label='x' onClick={onCloseBtnClick} />
			</div>
		</div>
	);
}
