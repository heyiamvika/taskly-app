import React, { useEffect, useState } from 'react';

import './HomePage.css';

import { Calendar } from '../../Calendar/Calendar';
import { DaySchedule } from '../../DaySchedule/DaySchedule';
import { UserInfo } from '../../UserInfo/UserInfo';
import { AddNewEvent } from '../../AddNewEvent/AddNewEvent';

import withAuthentification from '../../Session/withAuthentification';
import Firebase, { withFirebase } from '../../Firebase/index';

const UserInfoWithAuthentification = withAuthentification(UserInfo);
const AddNewEventSection = withFirebase(AddNewEvent);

type Props = {
	firebase: Firebase;
	user: {
		uid: string;
	};
};

export function HomePage({ firebase, user }: Props) {
	const [currentDate] = useState(new Date());
	const [visibleDate, setVisibleDate] = useState(currentDate);
	const [monthlySchedule, setMonthlySchedule] = useState<{
		[key: number]: object;
	} | null>(null);
	const [addNewEventVisible, setAddNewEventVisible] = useState(false);

	const switchToPrevMonth = () => {
		setVisibleDate(
			new Date(
				visibleDate.getFullYear(),
				visibleDate.getMonth() - 1,
				visibleDate.getDate(),
			),
		);
	};

	const switchToNextMonth = () => {
		setVisibleDate(
			new Date(
				visibleDate.getFullYear(),
				visibleDate.getMonth() + 1,
				visibleDate.getDate(),
			),
		);
	};

	const switchToPrevDay = () => {
		setVisibleDate(
			new Date(
				visibleDate.getFullYear(),
				visibleDate.getMonth(),
				visibleDate.getDate() - 1,
			),
		);
	};

	const switchToNextDay = () => {
		setVisibleDate(
			new Date(
				visibleDate.getFullYear(),
				visibleDate.getMonth(),
				visibleDate.getDate() + 1,
			),
		);
	};

	const chooseDay = (value: Date | undefined) => {
		if (!value) return;
		setVisibleDate(value);
	};

	const getVisibleDayEvents = () => {
		return monthlySchedule ? monthlySchedule[visibleDate.getDate()] : null;
	};

	const openAddNewEventSection = () => setAddNewEventVisible(true);
	const closeAddNewEventSection = () => setAddNewEventVisible(false);

	useEffect(() => {
		if (!user) return;
		//componentDidMount
		//componentDidUpdate

		// Create new task!!

		// const startTime = new Date(
		// 	visibleDate.getFullYear(),
		// 	visibleDate.getMonth(),
		// 	visibleDate.getDate(),
		// 	7,
		// );

		// const finishTime = new Date(
		// 	visibleDate.getFullYear(),
		// 	visibleDate.getMonth(),
		// 	visibleDate.getDate(),
		// 	8,
		// );

		// firebase.createNewTask(
		// 	user.uid,
		// 	visibleDate.getFullYear(),
		// 	visibleDate.getMonth(),
		// 	visibleDate.getDate(),
		// 	{
		// 		startTime: startTime.toString(),
		// 		finishTime: finishTime.toString(),
		// 		name: 'Wake up Buddy',
		// 		notes: 'Zoom call, kick off with Elena and Jordan from Shift.',
		// 		isPinned: false,
		// 	},
		// );

		// fetch user's schedule for this month
		async function fetchNewSchedule() {
			const newSchedule = await firebase.getMonthlySchedule(
				user.uid,
				visibleDate.getFullYear(),
				visibleDate.getMonth(),
			);

			setMonthlySchedule(newSchedule);
		}

		fetchNewSchedule();
	}, [currentDate, visibleDate, firebase, user]);

	return (
		<div className='home-page'>
			<div className='home-page-grey-section'>
				<Calendar
					currentDate={currentDate}
					visibleDate={visibleDate}
					switchToNextMonth={switchToNextMonth}
					switchToPrevMonth={switchToPrevMonth}
					onDayChoose={chooseDay}
				/>
			</div>
			<div className='home-page-white-section'>
				<DaySchedule
					visibleDay={visibleDate}
					dayEvents={getVisibleDayEvents()}
					switchToPrevDay={switchToPrevDay}
					switchToNextDay={switchToNextDay}
					onAddNewEventBtnClick={openAddNewEventSection}
				/>
				<UserInfoWithAuthentification />
				<AddNewEventSection
					isVisible={addNewEventVisible}
					onCloseBtnClick={closeAddNewEventSection}
					eventDate={visibleDate}
				/>
			</div>
		</div>
	);
}
