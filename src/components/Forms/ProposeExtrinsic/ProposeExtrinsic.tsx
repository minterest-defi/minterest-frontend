import React from 'React';
import { Button } from 'semantic-ui-react';
import { reduxForm } from 'redux-form';
import Loading from '../../../util/Loading';
import { FORM_FIELD_TYPES } from '../../../util/constants';
import { BaseFormProps } from '../Form.types';

function ProposeExtrinsic(props: BaseFormProps) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	const formBuilder = () => {
		return <div className='dynamic-field-set'>

		</div>
	};

	const getFieldByType = () => {
		const type = 'u32';
		switch (type) {
			case FORM_FIELD_TYPES.u128:
			case FORM_FIELD_TYPES.u8:
			case FORM_FIELD_TYPES.u32: {
				//simpleInput
				break;
			}
			default: {
				return null;
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className='propose-extrinsic-form'>
			{isLoading ? (
				<div>
					<Loading />
				</div>
			) : (
				<Button role='submit' disabled={!valid || !isAccountReady}>
					Confirm
				</Button>
			)}
		</form>
	);
}

export default reduxForm<{}, BaseFormProps>({
	form: 'proposeExtrinsic',
})(ProposeExtrinsic);
