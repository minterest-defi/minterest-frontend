import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';
import { CurrenciesOptionsForm } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required } from '../validators';
import InputField from '../Fields/InputField/InputField';
import './SendBorrow.scss';

function SendBorrow(props: CurrenciesOptionsForm) {
	const {
		handleSubmit,
		isLoading,
		isAccountReady,
		valid,
		currenciesOptions,
		onCancel,
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

export default reduxForm<{}, CurrenciesOptionsForm>({
	form: 'borrow',
})(SendBorrow);
