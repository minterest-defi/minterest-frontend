import React from 'react';
import { Button } from 'semantic-ui-react';
import { Field } from 'redux-form';
import DropdownField from '../../Fields/DropdownField/DropdownField';
import { isDecimal, required } from '../../validators';
import InputField from '../../Fields/InputField/InputField';

export default function FeedValue({
	fields,
	meta: { error, submitFailed },
	currenciesOptions,
}: any) {
	return (
		<ul>
			<div>
				<Button type='button' onClick={() => fields.push({})}>
					Add Form
				</Button>
				{submitFailed && error && <span>{error}</span>}
			</div>
			{fields.map((value: any, index: number) => (
				<div key={index}>
					<h4>Form #{index + 1}</h4>
					<Field
						name={`${value}.currencyId`}
						component={DropdownField}
						options={currenciesOptions}
						placeholder='Asset'
						validate={required}
					/>
					<Field
						name={`${value}.price`}
						component={InputField}
						placeholder='Enter the price'
						validate={[required, isDecimal]}
					/>
					<Button type='button' onClick={() => fields.remove(index)}>
						Delete Form
					</Button>
				</div>
			))}
		</ul>
	);
}
