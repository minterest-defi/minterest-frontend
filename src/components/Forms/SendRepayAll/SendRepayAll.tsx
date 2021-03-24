import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';
// @ts-ignore
import classes from './SendRepayAll.module.css';

function SendRepayAll(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<Field
				name='underlyingAssetId'
				component={DropdownField}
				options={ASSETS_OPTION_LIST}
				placeholder='Asset'
				validate={required}
			/>
			{isLoading ? (
				<Loading />
			) : (
				<Button
					role='submit'
					color={isAccountReady ? 'green' : 'red'}
					disabled={!valid || !isAccountReady}
				>
					Repay All
				</Button>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'repayAll',
	// @ts-ignore
})(SendRepayAll);
