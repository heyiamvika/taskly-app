import React from 'react';

import './BasicInput.css';

type Props = {
	name: string;
	value: string;
	inputType: 'text' | 'email' | 'password';
	placeholder: string;
	color: 'yellow' | 'transparent';
	onChange: (newValue: string, key: string) => void;
};

export function BasicInput({
	name,
	value,
	inputType,
	placeholder,
	onChange,
	color,
}: Props) {
	return (
		<input
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value, e.target.name)}
			type={inputType}
			placeholder={placeholder}
			className={`basic-input ${color}`}
		/>
	);
}
