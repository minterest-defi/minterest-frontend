import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputAmountField from '../Fields/InputAmountField/InputAmountField';
import { required } from '../validators';

function SendDepositInsurance(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Deposit Insurance</h4>
			<div>
				<Field
					name='amount'
					component={InputAmountField}
					placeholder='Enter the amount'
					validate={required}
				/>
				<Field
					name='poolId'
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
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'depositInsurance',
})(SendDepositInsurance);
