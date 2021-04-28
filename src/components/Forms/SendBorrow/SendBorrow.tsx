import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { SendBorrowForm } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required } from '../validators';
import InputField from '../Fields/InputField/InputField';
import './SendBorrow.scss';

const validate = (values: any) => {
	const errors = {};
	if (!values.borrowAmount) {
		// @ts-ignore
		errors.borrowAmount = 'Required';
	} else if (values.borrowAmount > 100) {
		// @ts-ignore
		errors.borrowAmount = 'Not enough collateral to borrow this value';
	}
	return errors;
};

function SendBorrow(props: SendBorrowForm) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		currenciesOptions,
		onCancel,
		formActionInfoBlock,
		disableCurrencySelection,
	} = props;

	return (
		<form onSubmit={handleSubmit} className='form-block'>
			<div className='fields'>
				<div className='field'>
					<Field
						name='underlyingAssetId'
						component={DropdownField}
						options={currenciesOptions}
						placeholder='Asset'
						validate={required}
						disableCurrencySelection={disableCurrencySelection}
					/>
				</div>
				<div className='field'>
					<Field
						name='borrowAmount'
						component={InputField}
						placeholder='Enter the amount'
						validate={[required, isDecimal]}
					/>
				</div>
			</div>
			{formActionInfoBlock}
			<div className='actions'>
				{isLoading ? (
					<div className='loader'>
						<Loading />
					</div>
				) : (
					<Button
						className='action'
						role='submit'
						disabled={!valid || !isAccountReady}
					>
						Confirm
					</Button>
				)}
				<Button className='action' role='button' onClick={onCancel}>
					Cancel
				</Button>
			</div>
		</form>
	);
}

export default reduxForm<{}, SendBorrowForm>({
	form: 'borrow',
	validate,
})(SendBorrow);
