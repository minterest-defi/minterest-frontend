import React from 'react';
import { Input } from 'semantic-ui-react';
import { countDecimals } from '../../../../util';

export default function InputAmountField(props) {
	const {
		placeholder,
		input: { onChange },
	} = props;

	const handleChange = (e) => {
		if (e.target.value === '') {
			onChange(null);
			return;
		}

		const value = +e.target.value;
		let multiplier = 10n ** 18n;
		const decimalCount = countDecimals(value);

		if (decimalCount) {
			const convertedValue = BigInt(value * 10 ** decimalCount);
			const normalizedValue =
				(convertedValue * multiplier) / BigInt(10 ** decimalCount);
			onChange(normalizedValue);
		} else {
			onChange(BigInt(value) * multiplier);
		}
	};

	return (
		<Input type='text' placeholder={placeholder} onChange={handleChange} />
	);
}
