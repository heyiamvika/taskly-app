/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import './HomePage.css';

import { Calendar } from '../../Calendar/Calendar';
import { DaySchedule } from '../../DaySchedule/DaySchedule';
import { UserInfo } from '../../UserInfo/UserInfo';

import withAuthentification from '../../Session/withAuthentification';
import Firebase from '../../Firebase/index';

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

	// console.log('monthlySchedule', monthlySchedule);
	// console.log(
	// 	'visibleSchedule',
	// 	monthlySchedule && monthlySchedule[visibleDate.getDate()],
	// );

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

			// console.log('newSchedule', newSchedule);
			setMonthlySchedule(newSchedule);
		}

		fetchNewSchedule();

		// return () => {
		// 	// runs when componentDidUnmount
		// 	console.log('cleanup');
		// };
	}, [currentDate, visibleDate, firebase, user]);

	return (
		<div className='home-page'>
			<Calendar
				currentDate={currentDate}
				visibleDate={visibleDate}
				switchToNextMonth={switchToNextMonth}
				switchToPrevMonth={switchToPrevMonth}
				onDayChoose={chooseDay}
			/>
			<DaySchedule
				visibleDay={visibleDate}
				dayEvents={getVisibleDayEvents()}
				switchToPrevDay={switchToPrevDay}
				switchToNextDay={switchToNextDay}
			/>
			<UserInfoWithAuthentification />
		</div>
	);
}
