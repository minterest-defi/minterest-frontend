import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	POOL_OPERATIONS,
} from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';

function PauseSpecificOperation(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const operations = POOL_OPERATIONS.map((action) => ({
		key: action,
		text: action,
		value: action,
	}));

	return (
		<form onSubmit={handleSubmit}>
			<h4>Pause Operation</h4>
			<div>
				<Field
					name='poolId'
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
				<Field
					name='operation'
					component={DropdownField}
					options={operations}
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
						Pause
					</Button>
				)}
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'pauseSpecificOperation',
})(PauseSpecificOperation);
