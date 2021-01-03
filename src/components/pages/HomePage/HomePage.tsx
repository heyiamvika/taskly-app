import React, { useState } from 'react';

import './HomePage.css';

import { Calendar } from '../../Calendar/Calendar';
import { DaySchedule } from '../../DaySchedule/DaySchedule';
import { UserInfo } from '../../UserInfo/UserInfo';
import { AddNewEvent } from '../../AddNewEvent/AddNewEvent';

import { useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../store/auth';

import { Redirect } from 'react-router-dom';
import * as ROUTES from '../../../utils/routes';

export function HomePage() {
	const [addNewEventVisible, setAddNewEventVisible] = useState(false);

	const userLoggedIn = useSelector(isUserLoggedIn);

	console.log('userLoggedIn', userLoggedIn);

	const openAddNewEventSection = () => setAddNewEventVisible(true);
	const closeAddNewEventSection = () => setAddNewEventVisible(false);

	const renderHomePage = () => (
		<div className='home-page'>
			<div className='home-page-grey-section'>
				<Calendar />
			</div>
			<div className='home-page-white-section'>
				<DaySchedule onAddNewEventBtnClick={openAddNewEventSection} />
				<UserInfo />
				<AddNewEvent
					isVisible={addNewEventVisible}
					onCloseBtnClick={closeAddNewEventSection}
				/>
			</div>
		</div>
	);

	const redirectToWelcomePage = () => <Redirect to={ROUTES.WELCOME_SCREEN} />;

	return userLoggedIn ? renderHomePage() : redirectToWelcomePage();
}
