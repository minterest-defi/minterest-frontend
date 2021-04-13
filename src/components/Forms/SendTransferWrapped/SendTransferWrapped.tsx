import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { WrappedCurrenciesOptionsForm } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { isDecimal, required } from '../validators';
import classes from './SendTransferWrapped.module.css';

function SendTransferWrapped(props: WrappedCurrenciesOptionsForm) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		wrappedCurrenciesOptions,
	} = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
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
					type='text'
					name='receiver'
					component={InputField}
					placeholder='Enter the public key'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					name='convertedAmount'
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
					Transfer Wrapped
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, WrappedCurrenciesOptionsForm>({
	form: 'transferWrapped',
})(SendTransferWrapped);
