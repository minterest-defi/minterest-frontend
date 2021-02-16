import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import { Button } from 'semantic-ui-react';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';

function SetKink(props) {
	const { handleSubmit } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Kink</h4>
			<Field
				name='pollId'
				component={DropdownField}
				options={assets}
				placeholder='Asset'
			/>
			<Field
				name='kinkNominator'
				component={InputField}
				placeholder='Enter the amount'
			/>
			<Field
				name='kinkDivider'
				component={InputField}
				placeholder='Enter the amount'
			/>
			<Button role='submit'>Set</Button>
		</form>
	);
}

export default reduxForm({
	form: 'setKink',
})(SetKink);
