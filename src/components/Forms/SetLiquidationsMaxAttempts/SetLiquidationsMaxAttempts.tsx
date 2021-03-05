import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import { Button } from 'semantic-ui-react';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import Loading from '../../../util/Loading';
import { required, isInteger } from '../validators';

function SetLiquidationsMaxAttempts(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Set Liquidations Max Attempts</h4>
			<Field
				name='poolId'
				component={DropdownField}
				options={assets}
				placeholder='Asset'
				validate={required}
			/>
			<Field
				name='newMaxValue'
				component={InputField}
				placeholder='Enter the amount'
				validate={[required, isInteger]}
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
	form: 'setLiquidationsMaxAttempts',
})(SetLiquidationsMaxAttempts);
