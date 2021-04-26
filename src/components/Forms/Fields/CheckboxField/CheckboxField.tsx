import React from 'react';
import { Checkbox } from 'semantic-ui-react';

interface Props {
	toggle: boolean;
	label: string;
	input: any;
}

export default function CheckboxField(props: Props) {
	const {
		toggle,
		label,
		input: { value, onChange },
	} = props;

	const handleChange = (event: any, data: any) => {
		onChange(data.checked);
	};

	return (
		<Checkbox
			toggle={toggle}
			label={label}
			checked={!!value}
			onChange={handleChange}
		/>
	);
}
