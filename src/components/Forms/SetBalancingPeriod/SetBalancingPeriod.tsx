import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import InputField from '../Fields/InputField/InputField';
import { required, isDecimal } from '../validators';
import { BaseFormProps } from '../Form.types';

function SetBalancingPeriod(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Balancing Period</h4>
			<div>
				<Field
					name='newPeriod'
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
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'setBalancingPeriod',
	// @ts-ignore
})(SetBalancingPeriod);
