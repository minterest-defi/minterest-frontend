import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { required } from '../validators';

function SendDepositUnderlying(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Deposit Underlying</h4>
			<Field
				name='underlyingAmount'
				component={InputField}
				placeholder='Enter the amount'
				validate={required}
			/>
			<Field
				name='underlyingAssetId'
				component={DropdownField}
				options={assets}
				placeholder='Asset'
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
					Deposit
				</Button>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'depositUnderlying',
})(SendDepositUnderlying);
