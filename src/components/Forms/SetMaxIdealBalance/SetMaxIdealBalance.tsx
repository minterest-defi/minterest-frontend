import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { MaxIdealBalanceProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required, isMax } from '../validators';
import InputField from '../Fields/InputField/InputField';
import classes from './SetMaxIdealBalance.module.css';

function SetMaxIdealBalance(props: MaxIdealBalanceProps) {
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
					name='maxIdealBalance'
					component={InputField}
					placeholder='Enter the amount'
					validate={[isDecimal, isMax]}
				/>
			</div>
			<div>
				{isLoading ? (
					<Loading />
				) : (
					<div className={classes.wrapper}>
						<Button
							role='submit'
							color={isAccountReady ? 'green' : 'red'}
							disabled={!valid || !isAccountReady}
						>
							Set Max Ideal Balance
						</Button>
					</div>
				)}
			</div>
		</form>
	);
}

export default reduxForm<{}, MaxIdealBalanceProps>({
	form: 'setMaxIdealBalance',
})(SetMaxIdealBalance);
