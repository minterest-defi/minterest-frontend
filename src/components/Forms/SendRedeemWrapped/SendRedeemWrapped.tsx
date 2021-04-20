import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { WrappedCurrenciesOptionsForm } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required } from '../validators';
import InputField from '../Fields/InputField/InputField';
import './SendRedeemWrapped.scss';

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
		<form onSubmit={handleSubmit} className='form-block'>
			<div className='fields'>
				<div className='field'>
					<Field
						name='wrappedId'
						component={DropdownField}
						options={wrappedCurrenciesOptions}
						placeholder='Asset'
						validate={required}
					/>
				</div>
				<div className='field'>
					<Field
						name='wrappedAmount'
						component={InputField}
						placeholder='Enter the amount'
						validate={[required, isDecimal]}
					/>
				</div>
			</div>
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

export default reduxForm<{}, WrappedCurrenciesOptionsForm>({
	form: 'redeemWrapped',
})(SendRedeemWrapped);
