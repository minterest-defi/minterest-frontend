import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import InputField from '../Fields/InputField/InputField';
import { BaseFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import { required, isInteger } from '../validators';
import classes from './SetMNTRateForSide.module.scss';

function SetMNTRateForSide(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='rateForSide'
					component={InputField}
					placeholder='Enter the amount'
					validate={[required, isInteger]}
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
					Set MNT Rate for Side
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'setMNTRateForSide',
})(SetMNTRateForSide);
