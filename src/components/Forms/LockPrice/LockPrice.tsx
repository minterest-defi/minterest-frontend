import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { CurrenciesOptionsForm } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';
import classes from './LockPrice.module.scss';

function LockPrice(props: CurrenciesOptionsForm) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		currenciesOptions,
	} = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='currencyId'
					component={DropdownField}
					options={currenciesOptions}
					placeholder='Asset'
					validate={required}
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
					Lock Price
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, CurrenciesOptionsForm>({
	form: 'lockPrice',
})(LockPrice);
