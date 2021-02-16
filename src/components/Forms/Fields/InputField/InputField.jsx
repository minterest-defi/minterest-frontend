import React from 'react';
import { Input } from 'semantic-ui-react';

export default function InputField(props) {
	const {
		placeholder,
		input: { onChange },
	} = props;

	const handleChange = (e) => {
		onChange(e.target.value);
	};

	return (
		<Input type='text' placeholder={placeholder} onChange={handleChange} />
	);
}
