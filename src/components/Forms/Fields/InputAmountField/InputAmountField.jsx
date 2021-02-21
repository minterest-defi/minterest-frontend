import React from 'react';
import { Input } from 'semantic-ui-react';

export default function InputField(props) {
	const {
		placeholder,
		input: { onChange },
	} = props;

	const handleChange = (e) => {
		onChange(BigInt(e.target.value) * 10n ** 18n);
	};

	return (
		<Input type='text' placeholder={placeholder} onChange={handleChange} />
	);
}
