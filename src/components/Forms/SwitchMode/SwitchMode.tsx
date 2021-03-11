import React from 'react';
import { reduxForm } from 'redux-form';
import { Button } from 'semantic-ui-react';
import Loading from '../../../util/Loading';

function SwitchMode(props) {
	const { handleSubmit, isLoading, isAccountReady, valid } = props;

	return (
		<form onSubmit={handleSubmit}>
			<h4>Switch Mode</h4>
			{isLoading ? (
				<Loading />
			) : (
				<Button
					role='submit'
					color={isAccountReady ? 'green' : 'red'}
					disabled={!valid || !isAccountReady}
				>
					Set
				</Button>
			)}
		</form>
	);
}

export default reduxForm({
	form: 'switchMode',
})(SwitchMode);
