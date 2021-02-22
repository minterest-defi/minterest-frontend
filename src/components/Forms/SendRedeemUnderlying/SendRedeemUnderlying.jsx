import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputAmountField from '../Fields/InputAmountField/InputAmountField';
import { required } from '../validators';

function SendRedeemUnderlying(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Redeem Underlying</h4>
			{isLoading ? (
				<Loading />
			) : (
				<div>
					<Field
						name='underlyingAmount'
						component={InputAmountField}
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
					<Button
						role='submit'
						color={isAccountReady ? 'green' : 'red'}
						disabled={!valid || !isAccountReady}
					>
						Redeem Underlying
					</Button>
				</div>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'redeemUnderlying',
})(SendRedeemUnderlying);
