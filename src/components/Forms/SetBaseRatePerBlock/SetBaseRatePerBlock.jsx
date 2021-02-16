import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';

function SetBaseRatePerBlock(props) {
	const { handleSubmit } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Base Rate Per Block</h4>
			<Field
				name='pollId'
				component={DropdownField}
				options={assets}
				placeholder='Asset'
			/>
			<Field
				name='baseRatePerYearN'
				component={InputField}
				placeholder='Enter the amount'
			/>
			<Field
				name='baseRatePerYearD'
				component={InputField}
				placeholder='Enter the amount'
			/>
			<Button role='submit'>Set</Button>
		</form>
	);
}

export default reduxForm({
	form: 'setBaseRatePerBlock',
})(SetBaseRatePerBlock);
