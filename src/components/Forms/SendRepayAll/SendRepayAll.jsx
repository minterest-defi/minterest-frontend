import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';

function SendRepayAll(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Repay All</h4>
			<div>
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
						Repay All
					</Button>
				)}
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'repayAll',
})(SendRepayAll);
