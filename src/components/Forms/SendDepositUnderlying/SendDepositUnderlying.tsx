import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { SendDepositUnderlyingFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { required, isDecimal, isMin } from '../validators';
import './SendDepositUnderlying.scss';

function SendDepositUnderlying(props: SendDepositUnderlyingFormProps) {
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
						name='underlyingAmount'
						component={InputField}
						placeholder='Enter the amount'
						validate={[required, isDecimal, isMin]}
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

export default reduxForm<{}, SendDepositUnderlyingFormProps>({
	form: 'depositUnderlying',
})(SendDepositUnderlying);
