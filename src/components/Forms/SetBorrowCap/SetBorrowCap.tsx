import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { BorrowCapProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required, isMax } from '../validators';
import InputField from '../Fields/InputField/InputField';
import classes from './SetBorrowCap.module.css';

function SetBorrowCap(props: BorrowCapProps) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		change,
		currenciesOptions,
	} = props;

	const reset = () => {
		change('borrowCap', null);
	};

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
					name='borrowCap'
					component={InputField}
					placeholder='Enter the amount'
					validate={[isDecimal, isMax]}
				/>
			</div>
			<div>
				{isLoading ? (
					<Loading />
				) : (
					<div className={classes.wrapper}>
						<Button
							role='submit'
							color={isAccountReady ? 'green' : 'red'}
							disabled={!valid || !isAccountReady}
						>
							Set Borrow Cap
						</Button>
						<Button type='button' onClick={reset}>
							Reset Borrow Cap
						</Button>
					</div>
				)}
			</div>
		</form>
	);
}

export default reduxForm<{}, BorrowCapProps>({
	form: 'setBorrowCap',
})(SetBorrowCap);
