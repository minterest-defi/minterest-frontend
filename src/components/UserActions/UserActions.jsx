import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DepositOperations from './DepositOperations/DepositOperations';
import { userDepositOperations } from '../../actions/userDepositOperations';

function UserActions(props) {
	const {
		account,
		api,
		keyring,
		updateData,
		depositUnderlying,
		depositUnderlyingResponse,
		isDepositUnderlyingResponseRunning,
	} = props;

	useEffect(() => {
		if (isDepositUnderlyingResponseRunning || !depositUnderlyingResponse)
			return;

		const { isError, errorMessage } = depositUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [depositUnderlyingResponse, isDepositUnderlyingResponseRunning]);

	const handleError = (errorMessage) => alert(errorMessage);
	const handleSuccess = () => alert('Transaction completed successfully.');
	return (
		<div>
			<DepositOperations
				account={account}
				api={api}
				keyring={keyring}
				depositUnderlying={depositUnderlying}
				isDepositUnderlyingResponseRunning={isDepositUnderlyingResponseRunning}
			/>
		</div>
	);
}

const mapStateToProps = (state) => ({
	api: state.substrate.api,
	keyring: state.account.keyring,
	depositUnderlyingResponse:
		state.userDepositOperations.depositUnderlyingResponse,
	isDepositUnderlyingResponseRunning:
		state.userDepositOperations.isDepositUnderlyingResponseRunning,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
