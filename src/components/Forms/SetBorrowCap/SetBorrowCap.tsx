import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import { ASSETS_OPTION_LIST } from '../../../util/constants';
import { BorrowCapProps } from '../Form.types';
import Loading from '../../../util/Loading';
import DropdownField from '../Fields/DropdownField/DropdownField';
import { isDecimal, required, isMax } from '../validators';
import InputField from '../Fields/InputField/InputField';

function SetBorrowCap(props: BorrowCapProps) {
	const { handleSubmit, isLoading, isAccountReady, valid, change } = props;

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
					options={ASSETS_OPTION_LIST}
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
	// @ts-ignore
})(SetBorrowCap);
