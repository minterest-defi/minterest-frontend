import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { SendRedeemUnderlyingFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { isDecimal, required, isMin } from '../validators';
import './SendRedeemUnderlying.scss';
import CheckboxField from '../Fields/CheckboxField/CheckboxField';

function SendRedeemUnderlying(props: SendRedeemUnderlyingFormProps) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		currenciesOptions,
		onCancel,
		handleAllCase,
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
				{!handleAllCase && (
					<div className='field'>
						<Field
							name='underlyingAmount'
							component={InputField}
							placeholder='Enter the amount'
							validate={[required, isDecimal, isMin]}
						/>
					</div>
				)}
				<div className='field checkbox'>
					<Field
						name='handleAll'
						component={CheckboxField}
						toggle={true}
						label='Withdraw All?'
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

export default reduxForm<{}, SendRedeemUnderlyingFormProps>({
	form: 'redeemUnderlying',
})(SendRedeemUnderlying);
