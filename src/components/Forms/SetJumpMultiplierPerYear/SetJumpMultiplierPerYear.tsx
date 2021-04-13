import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { CurrenciesOptionsForm } from '../Form.types';
import Loading from '../../../util/Loading';
import { required, isDecimal } from '../validators';
import classes from './SetJumpMultiplierPerYear.module.scss';

function SetJumpMultiplierPerYear(props: CurrenciesOptionsForm) {
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
					name='jumpMultiplierRatePerYear'
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
					Set Jump Multiplier Per Year
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, CurrenciesOptionsForm>({
	form: 'setJumpMultiplierPerYear',
})(SetJumpMultiplierPerYear);
