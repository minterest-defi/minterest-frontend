import React from 'react';
import { Input } from 'semantic-ui-react';

interface InputFieldProps {
	type: string;
	placeholder: string;
	input: any;
	meta: any;
}

export default function InputField(props: InputFieldProps) {
	const {
		type = 'number',
		placeholder,
		input,
		meta: { error, touched },
	} = props;

	return (
		<div>
			<Input type={type} placeholder={placeholder} {...input} />
			{touched && (
				<div>
					<span>{error}</span>
				</div>
			)}
		</div>
	);
}
