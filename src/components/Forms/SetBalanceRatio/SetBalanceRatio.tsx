import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { CurrenciesOptionsForm } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { required, isDecimal } from '../validators';
import classes from './SetBalanceRatio.module.scss';

function SetBalanceRatio(props: CurrenciesOptionsForm) {
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
					name='poolId'
					component={DropdownField}
					options={currenciesOptions}
					placeholder='Asset'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					name='newBalanceRatio'
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
					Set Balance Ratio
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, CurrenciesOptionsForm>({
	form: 'setBalanceRatio',
})(SetBalanceRatio);
