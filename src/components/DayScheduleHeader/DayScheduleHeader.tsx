import React from 'react';

import { ButtonDirection, ButtonSize } from '../../utils/buttonOptions';
import { FULL_DAYS_OF_THE_WEEK } from '../../utils/constants';

import { RoundYellowButton } from '../buttons/RoundYellowButton/RoundYellowButton';
import { RoundArrowButton } from '../buttons/RoundArrowButton/RoundArrowButton';

import './DayScheduleHeader.css';

import { useDispatch, useSelector } from 'react-redux';
import { changeDate, getVisibleDate } from '../../store/calendar';

type Props = {
	onAddNewEventBtnClick: () => void;
};

export function DayScheduleHeader({ onAddNewEventBtnClick }: Props) {
	const dispatch = useDispatch();
	const visibleDate = useSelector(getVisibleDate);

	const switchToPrevDay = () =>
		dispatch(
			changeDate(
				new Date(
					visibleDate.getFullYear(),
					visibleDate.getMonth(),
					visibleDate.getDate() - 1,
				),
			),
		);

	const switchToNextDay = () =>
		dispatch(
			changeDate(
				new Date(
					visibleDate.getFullYear(),
					visibleDate.getMonth(),
					visibleDate.getDate() + 1,
				),
			),
		);

	return (
		<div className='day-schedule-header'>
			<div className='day-schedule-wrapper'>
				<span className='day-schedule-header-heading'>Today's schedule</span>
				<div className='day-schedule-header-active-day'>
					<span className='day-schedule-header-heading active-day-heading'>{`${
						FULL_DAYS_OF_THE_WEEK[visibleDate.getDay()]
					} ${visibleDate.getDate()}`}</span>
					<RoundArrowButton
						size={ButtonSize.Big}
						direction={ButtonDirection.Left}
						onButtonClick={switchToPrevDay}
					/>
					<RoundArrowButton
						size={ButtonSize.Big}
						direction={ButtonDirection.Right}
						onButtonClick={switchToNextDay}
					/>
				</div>
			</div>
			<RoundYellowButton label='+' onClick={onAddNewEventBtnClick} />
		</div>
	);
}
