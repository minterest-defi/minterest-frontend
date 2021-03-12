import React from 'react';
import { Input } from 'semantic-ui-react';

export default function InputField(props) {
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
