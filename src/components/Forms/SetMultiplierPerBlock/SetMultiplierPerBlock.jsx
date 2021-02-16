import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';

function SetMultiplierPerBlock(props) {
	const { handleSubmit } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Multiplier Per Block</h4>
			<Field
				name='pollId'
				component={DropdownField}
				options={assets}
				placeholder='Asset'
			/>
			<Field
				name='multiplierRatePerYearN'
				component={InputField}
				placeholder='Enter the amount'
			/>
			<Field
				name='multiplierRatePerYearD'
				component={InputField}
				placeholder='Enter the amount'
			/>
			<Button role='submit'>Set</Button>
		</form>
	);
}

export default reduxForm({
	form: 'setMultiplierPerBlock',
})(SetMultiplierPerBlock);
