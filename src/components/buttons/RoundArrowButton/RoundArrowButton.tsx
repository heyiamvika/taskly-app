import React from 'react';

import './RoundArrowButton.css';

import { ButtonSize, ButtonDirection } from '../../../utils/buttonOptions';

import arrowLeft from '../../../assets/arrow_left.png';
import arrowRight from '../../../assets/arrow_right.png';

type Props = {
	size: ButtonSize;
	direction: ButtonDirection;
	onButtonClick: () => void;
};

export function RoundArrowButton({ size, direction, onButtonClick }: Props) {
	return (
		<button className={`round-arrow-btn ${size}`} onClick={onButtonClick}>
			<img src={direction === 'left' ? arrowLeft : arrowRight} />
		</button>
	);
}
