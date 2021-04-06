import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';
import classes from './UnlockPrice.module.css';

function UnlockPrice(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='currencyId'
					component={DropdownField}
					options={ASSETS_OPTION_LIST}
					placeholder='Asset'
					validate={required}
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
					Unlock Price
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'unlockPrice',
})(UnlockPrice);
