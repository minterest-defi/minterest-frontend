import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { UNDERLYING_ASSETS_TYPES } from '../../../util/constants';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required, isMax } from '../validators';
import InputField from '../Fields/InputField/InputField';

function SetBorrowCap(props) {
	const { handleSubmit, isLoading, isAccountReady, valid, change } = props;

	const assets = UNDERLYING_ASSETS_TYPES.map((currency) => ({
		key: currency,
		text: currency,
		value: currency,
	}));

	const reset = () => {
		change('borrowCap', null);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h4>Borrow Cap</h4>
			<div>
				<Field
					name='poolId'
					component={DropdownField}
					options={assets}
					placeholder='Asset'
					validate={required}
				/>
				<Field
					name='borrowCap'
					component={InputField}
					placeholder='Enter the amount'
					validate={[isDecimal, isMax]}
				/>
				{isLoading ? (
					<Loading />
				) : (
					<div>
						<Button
							role='submit'
							color={isAccountReady ? 'green' : 'red'}
							disabled={!valid || !isAccountReady}
						>
							Set
						</Button>
						<Button type='button' onClick={reset}>
							Reset
						</Button>
					</div>
				)}
			</div>
		</form>
	);
}

export default reduxForm({
	form: 'setBorrowCap',
})(SetBorrowCap);
