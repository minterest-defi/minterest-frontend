import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import InputField from '../Fields/InputField/InputField';
import { required, isDecimal } from '../validators';
import classes from './SetThreshold.module.css';

function SetThreshold(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='poolId'
					component={DropdownField}
					options={ASSETS_OPTION_LIST}
					placeholder='Asset'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					name='newThreshold'
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
					Set Threshold
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'setThreshold',
})(SetThreshold);
