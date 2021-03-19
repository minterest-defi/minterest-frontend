import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import Loading from '../../../util/Loading';
import { required, isDecimal } from '../validators';

function SetLoanSizeLiquidationThreshold(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Loan size Liquidations Threshold</h4>
			<Field
				name='poolId'
				component={DropdownField}
				options={ASSETS_OPTION_LIST}
				placeholder='Asset'
				validate={required}
			/>
			<Field
				name='newMinSum'
				component={InputField}
				placeholder='Enter the amount'
				validate={[required, isDecimal]}
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
	form: 'setLoanSizeLiquidationThreshold',
	// @ts-ignore
})(SetLoanSizeLiquidationThreshold);
