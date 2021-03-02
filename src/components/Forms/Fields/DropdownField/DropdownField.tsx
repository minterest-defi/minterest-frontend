import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export default function DropdownField(props) {
	const {
		options,
		placeholder,
		input: { onChange },
	} = props;

	const handleChange = (e) => {
		onChange(e.target.innerText);
	};

	return (
		<Dropdown
			compact
			placeholder={placeholder}
			search
			selection
			options={options}
			onChange={handleChange}
		/>
	);
}
