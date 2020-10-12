import React, { ChangeEvent } from 'react';

import './BasicInput.css';

type Props = {
	name: string;
	value: string;
	inputType: string;
	placeholder: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function BasicInput({
	name,
	value,
	inputType,
	placeholder,
	onChange,
}: Props) {
	return (
		<input
			name={name}
			value={value}
			onChange={onChange}
			type={inputType}
			placeholder={placeholder}
			className='basic-input'
		/>
	);
}
