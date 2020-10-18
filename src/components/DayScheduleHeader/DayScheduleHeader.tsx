import React from 'react';

import { ButtonDirection, ButtonSize } from '../../utils/buttonOptions';
import { FULL_DAYS_OF_THE_WEEK } from '../../utils/constants';

import { RoundYellowButton } from '../buttons/RoundYellowButton/RoundYellowButton';
import { RoundArrowButton } from '../buttons/RoundArrowButton/RoundArrowButton';

import './DayScheduleHeader.css';

type Props = {
	visibleDay: Date;
	onPrevDayBtnClick: () => void;
	onNextDayBtnClick: () => void;
	onAddNewEventBtnClick: () => void;
};

export function DayScheduleHeader({
	visibleDay,
	onPrevDayBtnClick,
	onNextDayBtnClick,
	onAddNewEventBtnClick,
}: Props) {
	return (
		<div className='day-schedule-header'>
			<div className='day-schedule-wrapper'>
				<span className='day-schedule-header-heading'>Today's schedule</span>
				<div className='day-schedule-header-active-day'>
					<span className='day-schedule-header-heading active-day-heading'>{`${
						FULL_DAYS_OF_THE_WEEK[visibleDay.getDay()]
					} ${visibleDay.getDate()}`}</span>
					<RoundArrowButton
						size={ButtonSize.Big}
						direction={ButtonDirection.Left}
						onButtonClick={onPrevDayBtnClick}
					/>
					<RoundArrowButton
						size={ButtonSize.Big}
						direction={ButtonDirection.Right}
						onButtonClick={onNextDayBtnClick}
					/>
				</div>
			</div>
			<RoundYellowButton label='+' onClick={onAddNewEventBtnClick} />
		</div>
	);
}
