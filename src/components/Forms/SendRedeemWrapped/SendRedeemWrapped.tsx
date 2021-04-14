import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { WrappedCurrenciesOptionsForm } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required } from '../validators';
import InputField from '../Fields/InputField/InputField';
import classes from './SendRedeemWrapped.module.scss';

function SendRedeemWrapped(props: WrappedCurrenciesOptionsForm) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		wrappedCurrenciesOptions,
		onCancel,
	} = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				{' '}
				<Field
					name='wrappedId'
					component={DropdownField}
					options={wrappedCurrenciesOptions}
					placeholder='Asset'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					name='wrappedAmount'
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
					Confirm
				</Button>
			)}
			<Button role='button' color='red' onClick={onCancel}>
				Cancel
			</Button>
		</form>
	);
}

export default reduxForm<{}, WrappedCurrenciesOptionsForm>({
	form: 'redeemWrapped',
})(SendRedeemWrapped);
