import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';

function LockPrice(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Lock Price</h4>
			<div>
				<Field
					name='currencyId'
					component={DropdownField}
					options={ASSETS_OPTION_LIST}
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
						Lock Price
					</Button>
				)}
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'lockPrice',
	// @ts-ignore
})(LockPrice);
