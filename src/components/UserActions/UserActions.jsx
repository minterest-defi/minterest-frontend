import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import DepositOperations from './DepositOperations/DepositOperations';
import { depositUnderlying } from '../../actions/userDepositOperations';

import BorrowOperations from './BorrowOperations/BorrowOperations';
import { borrow } from '../../actions/userBorrowOperations';

import Redeem from './Redeem/Redeem';
import RedeemUnderlying from './RedeemUnderlying/RedeemUnderlying';
import RedeemWrapped from './RedeemWrapped/RedeemWrapped';
import {
	redeem,
	redeemUnderlying,
	redeemWrapped,
} from '../../actions/userRedeemOperations';

import RepayAll from './RepayAll/RepayAll';
import Repay from './Repay/Repay';
import RepayOnBehalf from './RepayOnBehalf/RepayOnBehalf';
import {
	repayAll,
	repay,
	repayOnBehalf,
} from '../../actions/userRepayOperations';

import { getPoolsData } from '../../actions/poolsData';

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

		redeemUnderlying,
		redeemUnderlyingResponse,
		isRedeemUnderlyingResponseRunning,

		redeemWrapped,
		redeemWrappedResponse,
		isRedeemWrappedResponseRunning,

		repayAll,
		repayAllResponse,
		isRepayAllResponseRunning,

		repay,
		repayResponse,
		isRepayResponseRunning,

		repayOnBehalf,
		repayOnBehalfResponse,
		isRepayOnBehalfResponseRunning,

		getPoolsData,
	} = props;

	useEffect(() => {
		if (isDepositUnderlyingResponseRunning || !depositUnderlyingResponse)
			return;

		const { isError, errorMessage } = depositUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			getPoolsData();
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

	useEffect(() => {
		if (isRedeemUnderlyingResponseRunning || !redeemUnderlyingResponse) return;

		const { isError, errorMessage } = redeemUnderlyingResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [redeemUnderlyingResponse, isRedeemUnderlyingResponseRunning]);

	useEffect(() => {
		if (isRedeemWrappedResponseRunning || !redeemWrappedResponse) return;

		const { isError, errorMessage } = redeemWrappedResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [redeemWrappedResponse, isRedeemWrappedResponseRunning]);

	useEffect(() => {
		if (isRepayAllResponseRunning || !repayAllResponse) return;

		const { isError, errorMessage } = repayAllResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [repayAllResponse, isRepayAllResponseRunning]);

	useEffect(() => {
		if (isRepayResponseRunning || !repayResponse) return;

		const { isError, errorMessage } = repayResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [repayResponse, isRepayResponseRunning]);

	useEffect(() => {
		if (isRepayOnBehalfResponseRunning || !repayOnBehalfResponse) return;

		const { isError, errorMessage } = repayOnBehalfResponse;

		if (isError) {
			handleError(errorMessage);
		} else {
			handleSuccess();
		}
	}, [repayOnBehalfResponse, isRepayOnBehalfResponseRunning]);

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
			<RedeemUnderlying
				account={account}
				api={api}
				keyring={keyring}
				redeemUnderlying={redeemUnderlying}
				isRedeemUnderlyingResponseRunning={isRedeemUnderlyingResponseRunning}
				updateData={updateData}
			/>
			<RedeemWrapped
				account={account}
				api={api}
				keyring={keyring}
				redeemWrapped={redeemWrapped}
				isRedeemWrappedResponseRunning={isRedeemWrappedResponseRunning}
				updateData={updateData}
			/>
			<RepayAll
				account={account}
				api={api}
				keyring={keyring}
				repayAll={repayAll}
				isRepayAllResponseRunning={isRepayAllResponseRunning}
				updateData={updateData}
			/>
			<Repay
				account={account}
				api={api}
				keyring={keyring}
				repay={repay}
				isRepayResponseRunning={isRepayResponseRunning}
				updateData={updateData}
			/>
			<RepayOnBehalf
				account={account}
				api={api}
				keyring={keyring}
				repayOnBehalf={repayOnBehalf}
				isRepayOnBehalfResponseRunning={isRepayOnBehalfResponseRunning}
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

	redeemUnderlyingResponse: state.userRedeemOperations.redeemUnderlyingResponse,
	isRedeemUnderlyingResponseRunning:
		state.userRedeemOperations.isRedeemUnderlyingResponseRunning,

	redeemWrappedResponse: state.userRedeemOperations.redeemWrappedResponse,
	isRedeemWrappedResponseRunning:
		state.userRedeemOperations.isRedeemWrappedResponseRunning,

	repayAllResponse: state.userRepayOperations.repayAllResponse,
	isRepayAllResponseRunning:
		state.userRepayOperations.isRepayAllResponseRunning,

	repayResponse: state.userRepayOperations.repayResponse,
	isRepayResponseRunning: state.userRepayOperations.isRepayResponseRunning,

	repayOnBehalfResponse: state.userRepayOperations.repayOnBehalfResponse,
	isRepayOnBehalfResponseRunning:
		state.userRepayOperations.isRepayOnBehalfResponseRunning,
});

const mapDispatchToProps = {
	depositUnderlying,
	borrow,
	redeem,
	redeemUnderlying,
	redeemWrapped,
	repayAll,
	repay,
	repayOnBehalf,
	getPoolsData,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
