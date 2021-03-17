import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import { required } from '../validators';

function SetMultiplierPerBlock(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Multiplier Per Block</h4>
			<Field
				name='poolId'
				component={DropdownField}
				options={ASSETS_OPTION_LIST}
				placeholder='Asset'
				validate={required}
			/>
			<Field
				name='multiplierRatePerYearN'
				component={InputField}
				placeholder='Enter the amount'
				validate={required}
			/>
			<Field
				name='multiplierRatePerYearD'
				component={InputField}
				placeholder='Enter the amount'
				validate={required}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<Button
					role='submit'
					color={isAccountReady ? 'green' : 'red'}
					disabled={!valid || !isAccountReady}
				>
					Set
				</Button>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'setMultiplierPerBlock',
	// @ts-ignore
})(SetMultiplierPerBlock);
