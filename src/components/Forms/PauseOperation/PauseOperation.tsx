import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import {
	UNDERLYING_ASSETS_TYPES,
	POOL_OPERATIONS,
} from '../../../util/constants';
import Loading from '../../../util/Loading';
import { BaseFormProps } from '../Form.types';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { required } from '../validators';
import classes from './PauseOperation.module.css';

function PauseOperation(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const operations = POOL_OPERATIONS.map((action) => ({
		key: action,
		text: action,
		value: action,
	}));

	return (
		<form onSubmit={handleSubmit} className={classes.wrapper}>
			<div className={classes.item}>
				<Field
					name='poolId'
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
			</div>
			<div className={classes.item}>
				<Field
					name='operation'
					component={DropdownField}
					options={operations}
					placeholder='Operation'
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
					Pause Operation
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'pauseOperation',
})(PauseOperation);
