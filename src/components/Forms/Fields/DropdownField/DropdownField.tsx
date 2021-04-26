import React from 'react';
import { Dropdown, DropdownProps } from 'semantic-ui-react';

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

	const handleChange = (
		e: React.SyntheticEvent<HTMLElement>,
		_data: DropdownProps
	) => {
		onChange(_data.value);
	};

	return (
		<Dropdown
			compact
			placeholder={placeholder}
			search
			selection
			options={options}
			onChange={handleChange}
			value={value}
			disabled={value ? true : false}
		/>
	);
}
