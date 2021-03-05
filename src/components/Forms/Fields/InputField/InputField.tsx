import React from 'react';
import { Input } from 'semantic-ui-react';

export default function InputField(props) {
	const {
		placeholder,
		input,
		meta: { error, touched },
	} = props;

	return (
		<div>
			<Input type='number' placeholder={placeholder} {...input} />
			{touched && (
				<div>
					<span>{error}</span>
				</div>
			)}
		</div>
	);
}
