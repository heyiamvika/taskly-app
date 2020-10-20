import React, { useEffect, useState } from 'react';

import './HomePage.css';

import { Calendar } from '../../Calendar/Calendar';
import { DaySchedule } from '../../DaySchedule/DaySchedule';
import { UserInfo } from '../../UserInfo/UserInfo';
import { AddNewEvent } from '../../AddNewEvent/AddNewEvent';

import withAuthentification from '../../Session/withAuthentification';
import Firebase from '../../Firebase/index';

import { Event } from '../../../utils/types';

const UserInfoWithAuthentification = withAuthentification(UserInfo);

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

	const createNewEvent = (newEvent: Event) => {
		firebase.createNewTask(
			user.uid,
			visibleDate.getFullYear(),
			visibleDate.getMonth(),
			visibleDate.getDate(),
			newEvent,
		);

		closeAddNewEventSection();
		fetchNewSchedule();
	};

	const fetchNewSchedule = async () => {
		const newSchedule = await firebase.getMonthlySchedule(
			user.uid,
			visibleDate.getFullYear(),
			visibleDate.getMonth(),
		);

		setMonthlySchedule(newSchedule);
	};

	useEffect(() => {
		if (!user) return;

		// fetch user's schedule for this month
		fetchNewSchedule();

		// subscribe to user's schedule;
		// const onDataChanged = (data: any) => {
		// 	console.log('data changed', data);

		// 	setMonthlySchedule(data);
		// };

		// firebase.subscribeToMonthlySchedule(
		// 	user.uid,
		// 	visibleDate.getFullYear(),
		// 	visibleDate.getMonth(),
		// 	onDataChanged,
		// );

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

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
				<AddNewEvent
					isVisible={addNewEventVisible}
					eventDate={visibleDate}
					onCloseBtnClick={closeAddNewEventSection}
					onCreateNewEvent={createNewEvent}
				/>
			</div>
		</div>
	);
}
