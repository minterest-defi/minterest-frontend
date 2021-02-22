import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import DepositOperations from './DepositOperations/DepositOperations';
import { depositUnderlying } from '../../actions/userDepositOperations';

import BorrowOperations from './BorrowOperations/BorrowOperations';
import { borrow } from '../../actions/userBorrowOperations';

import Redeem from './Redeem/Redeem';
import { redeem } from '../../actions/userRedeemOperations';

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

		redeem,
		redeemResponse,
		isRedeemResponseRunning,
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

	useEffect(() => {
		if (isRedeemResponseRunning || !redeemResponse) return;

		const { isError, errorMessage } = redeemResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [redeemResponse, isRedeemResponseRunning]);

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
			<Redeem
				account={account}
				api={api}
				keyring={keyring}
				redeem={redeem}
				isRedeemResponseRunning={isRedeemResponseRunning}
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

	redeemResponse: state.userRedeemOperations.redeemResponse,
	isRedeemResponseRunning: state.userRedeemOperations.isRedeemResponseRunning,
});

const mapDispatchToProps = { depositUnderlying, borrow, redeem };

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
