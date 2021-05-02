import React, { useState } from 'react';

import './HomePage.css';

import { Calendar } from '../../Calendar/Calendar';
import { DaySchedule } from '../../DaySchedule/DaySchedule';
import { AddNewEvent } from '../../AddNewEvent/AddNewEvent';

export function HomePage() {
	const [addNewEventVisible, setAddNewEventVisible] = useState(false);

	const openAddNewEventSection = () => setAddNewEventVisible(true);
	const closeAddNewEventSection = () => setAddNewEventVisible(false);

	const renderHomePage = () => (
		<div className='home-page'>
			<div className='home-page-grey-section'>
				<Calendar />
			</div>
			<div className='home-page-white-section'>
				<DaySchedule onAddNewEventBtnClick={openAddNewEventSection} />
				<AddNewEvent
					isVisible={addNewEventVisible}
					onCloseBtnClick={closeAddNewEventSection}
				/>
			</div>
		</div>
	);

	return renderHomePage();
}
