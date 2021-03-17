import React from 'react';
import { Dropdown } from 'semantic-ui-react';

interface DropdownFieldProps {
	options: any;
	placeholder: string;
	input: any;
}

export default function DropdownField(props: DropdownFieldProps) {
	const {
		options,
		placeholder,
		input: { onChange, value },
	} = props;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.innerText);
	};

	return (
		<Dropdown
			compact
			placeholder={placeholder}
			search
			selection
			options={options}
			// @ts-ignore
			onChange={handleChange}
			value={value}
		/>
	);
}
