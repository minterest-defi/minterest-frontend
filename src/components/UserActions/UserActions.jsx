import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import DepositOperations from './DepositOperations/DepositOperations';
import { depositUnderlying } from '../../actions/userDepositOperations';

import BorrowOperations from './BorrowOperations/BorrowOperations';
import { borrow } from '../../actions/userBorrowOperations';

function UserActions(props) {
	const {
		account,
		api,
		keyring,
		updateData,

		depositUnderlying,
		depositUnderlyingResponse,
		isDepositUnderlyingResponseRunning,

		borrow,
		borrowResponse,
		isBorrowResponseRunning,
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

	useEffect(() => {
		if (isBorrowResponseRunning || !borrowResponse) return;

		const { isError, errorMessage } = borrowResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [borrowResponse, isBorrowResponseRunning]);

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
				updateData={updateData}
			/>
			<BorrowOperations
				account={account}
				api={api}
				keyring={keyring}
				borrow={borrow}
				isBorrowResponseRunning={isBorrowResponseRunning}
				updateData={updateData}
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

	borrowResponse: state.userBorrowOperations.borrowResponse,
	isBorrowResponseRunning: state.userBorrowOperations.isBorrowResponseRunning,
});

const mapDispatchToProps = { depositUnderlying, borrow };

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
