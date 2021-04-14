import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { CurrenciesOptionsForm } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import Loading from '../../../util/Loading';
import { required, isInteger } from '../validators';
import classes from './SetLiquidationsMaxAttempts.module.scss';

function SetLiquidationsMaxAttempts(props: CurrenciesOptionsForm) {
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
					name='newMaxValue'
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
					Set Liquidations Max Attempts
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, CurrenciesOptionsForm>({
	form: 'setLiquidationsMaxAttempts',
})(SetLiquidationsMaxAttempts);
