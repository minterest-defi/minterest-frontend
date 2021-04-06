import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import InputField from '../Fields/InputField/InputField';
import { required, isDecimal } from '../validators';
import { BaseFormProps } from '../Form.types';
import classes from './SetBalancingPeriod.module.css';

function SetBalancingPeriod(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='newPeriod'
					component={InputField}
					placeholder='Enter the amount'
					validate={[required, isDecimal]}
				/>
			</div>
			{isLoading ? (
				<Loading />
			) : (
				<Button
					role='submit'
					color={isAccountReady ? 'green' : 'red'}
					disabled={!valid || !isAccountReady}
				>
					Set Balancing Period
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'setBalancingPeriod',
})(SetBalancingPeriod);
