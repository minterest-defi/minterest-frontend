import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { WRAP_TOKEN_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import { BaseFormProps } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { isDecimal, required } from '../validators';
// @ts-ignore
import classes from './SendTransferWrapped.module.css';

function SendTransferWrapped(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = WRAP_TOKEN_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='wrappedId'
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					type='text'
					name='receiver'
					component={InputField}
					placeholder='Enter the public key'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					name='convertedAmount'
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
					Transfer Wrapped
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'transferWrapped',
})(SendTransferWrapped);
